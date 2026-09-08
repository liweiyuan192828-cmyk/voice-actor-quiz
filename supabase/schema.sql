-- 在 Supabase Dashboard → SQL Editor 中完整粘贴并运行本文件。
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  audio_url text not null,
  correct_answer text not null check (correct_answer in ('yes','no')),
  score integer not null default 3,
  penalty integer not null default -2,
  category text not null default '综合',
  note text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.quiz_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  nickname text check (char_length(nickname) between 1 and 16),
  total_score integer not null,
  accuracy numeric(5,2) not null,
  correct_count integer not null default 0,
  wrong_count integer not null default 0,
  unknown_count integer not null default 0,
  category text,
  created_at timestamptz not null default now()
);
-- 已经运行过本文件的项目也需要这行；可以安全重复执行。
alter table public.quiz_records add column if not exists nickname text check (char_length(nickname) between 1 and 16);
create index if not exists questions_category_idx on public.questions(category);
create index if not exists records_score_idx on public.quiz_records(total_score desc);

alter table public.questions enable row level security;
alter table public.quiz_records enable row level security;
alter table public.profiles enable row level security;
create policy "public reads active questions" on public.questions for select using (is_active = true);
create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users read own records" on public.quiz_records for select using (auth.uid() = user_id);

-- Storage：音频必须设为公开读取，上传操作只由服务端管理员接口完成。
insert into storage.buckets (id, name, public) values ('quiz-audio','quiz-audio',true) on conflict (id) do update set public=true;
create policy "public reads quiz audio" on storage.objects for select using (bucket_id = 'quiz-audio');

-- 5 道占位题。请上传音频后在后台把 audio_url 改为实际地址。
insert into public.questions (title,audio_url,correct_answer,score,penalty,category,note) values
('这是羊宫妃那吗？','https://example.com/audio/hina-01.mp3','yes',3,-2,'MyGO','占位音频，请替换'),
('这是高松灯的歌声吗？','https://example.com/audio/tomori-01.mp3','no',3,-2,'MyGO','占位音频，请替换'),
('这是 Poppin''Party 的现场片段吗？','https://example.com/audio/popipa-01.mp3','yes',3,-2,'BanG Dream','占位音频，请替换'),
('这是 Ave Mujica 的角色台词吗？','https://example.com/audio/avemujica-01.mp3','no',5,-3,'Ave Mujica','高难题占位'),
('这是综合题库的神秘声音吗？','https://example.com/audio/general-01.mp3','yes',3,-2,'综合','占位音频，请替换');
