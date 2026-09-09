import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
export const metadata: Metadata = { title: "声优鉴定局 | Voice Actor Quiz", description: "听音辨人，测试你的声优雷达" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}<Analytics /></body></html>; }
