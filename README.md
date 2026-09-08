# 声优鉴定局（Voice Actor Quiz）

这是一个可直接部署的声优猜测测试网站。用户无需登录即可答题；结算后可填写游客昵称进入排行榜。管理员可上传音频、增删改题目，并导入 CSV / Excel。项目使用 Next.js、TypeScript、Tailwind 与 Supabase。默认规则为答对加题目设定分数、答错扣题目设定分数、“不知道”扣 1 分。

> 第一次完成数据库设置后，**请先在后台上传音频并替换示例题目的占位链接**，否则示例题无法播放。

## 你需要准备什么

1. 安装 [Node.js LTS](https://nodejs.org/)（安装时一路点 Next）。
2. 注册 [Supabase](https://supabase.com/) 和 [Vercel](https://vercel.com/) 账号，免费版足够开始。
3. 下载或打开本项目文件夹。

## 第一步：在电脑上启动

在项目文件夹空白处右键，选择“在终端中打开”，依次复制并运行：

```bash
npm install
copy .env.example .env.local
npm run dev
```

打开浏览器访问 `http://localhost:3000`。此时还没有数据库配置，所以题库不会加载；继续下一步。

## 第二步：创建 Supabase 数据库

1. 在 Supabase 点击 **New project**，输入项目名并设置数据库密码，等待创建完成。
2. 左侧打开 **SQL Editor** → **New query**。
3. 打开本项目的 `supabase/schema.sql`，复制全部内容到编辑器，点击 **Run**。
4. 在 Supabase 左侧 **Project Settings** → **API**，复制 `Project URL`、`anon public` key 和 `service_role` key。
5. 用记事本打开 `.env.local`，将三项内容分别粘到：

```env
NEXT_PUBLIC_SUPABASE_URL=你的 Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon public key
SUPABASE_SERVICE_ROLE_KEY=你的 service_role key
ADMIN_ACCESS_KEY=请自己设一个长口令
```

6. 停掉终端（按 `Ctrl + C`），再次运行 `npm run dev`。现在首页可以加载题库。

## 第三步：添加你的第一道真实题目

1. 打开 `http://localhost:3000/admin`。
2. 输入你刚设置的 `ADMIN_ACCESS_KEY`，点击“进入”。
3. 填写题目标题和分类，把 mp3、wav 或 m4a 拖入音频区域。
4. 试听无误后设置正确答案、分数，点击“创建题目”。

音频会自动存入 Supabase Storage 的 `quiz-audio` 桶。管理员接口只接受你设置的口令；请勿把 `.env.local` 上传或发送给别人。

### 批量导入题目

后台点击“导入 CSV / Excel”，选择 `.csv`、`.xlsx` 或 `.xls` 文件。首行必须是这些英文表头。推荐使用 `.xlsx`；CSV 可使用 UTF-8 或 Windows 中文编码：

```csv
title,audio,answer,score,penalty,category,note
这是羊宫妃那吗,https://你的音频公开链接/hina01.mp3,yes,3,-2,MyGO,可选备注
```

其中 `answer` 只能填写 `yes` 或 `no`。批量导入里的 `audio` 是音频公开链接；需要先在后台逐个上传音频，再导出/整理链接后导入。

## 部署到 Vercel

1. 将项目上传到 GitHub：在 GitHub 新建一个空仓库，然后按页面提示把本地项目推送上去；或者在 Vercel 选择 **Import Git Repository**。
2. 在 Vercel 点击 **Add New → Project**，选择这个仓库，再点 **Deploy**。
3. 部署页面的 **Settings → Environment Variables**，新增与 `.env.local` 完全相同的四个变量：Supabase URL、anon key、service role key、管理员口令。
4. 点击 **Redeploy**。完成后 Vercel 给出的链接就是正式网站。

## 游客排行榜

不需要注册或微信登录。每次完成测试后，用户可以填写 1–16 个字符的昵称并提交成绩；排行榜只显示昵称、分数、正确率和题库信息。

## 目录说明

- `app/`：网站页面与 API。
- `components/`：可复用的 Logo、播放器和答题组件。
- `lib/`：类型、配置和 Supabase 客户端。
- `supabase/schema.sql`：一次性建表、存储桶、权限与 5 道占位题。

## 常见问题

- **题库加载失败**：检查 `.env.local` 是否保存、重启了开发服务器，以及 SQL 是否运行成功。
- **上传失败**：确认 `SUPABASE_SERVICE_ROLE_KEY` 不是 anon key，并确认运行了 SQL 文件。
- **音频播放不了**：示例音频链接只是占位。请在后台上传真实音频并保存题目。
