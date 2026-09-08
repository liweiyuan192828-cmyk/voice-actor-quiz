-- 为已有项目增加游客昵称排行榜字段；可安全重复运行。
alter table public.quiz_records
  add column if not exists nickname text check (char_length(nickname) between 1 and 16);
