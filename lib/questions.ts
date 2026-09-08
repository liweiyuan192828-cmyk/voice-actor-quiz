import type { Question } from "./types";
export async function getQuestions(category?: string) {
  const query = category && category !== "综合" ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`/api/questions${query}`);
  if (!res.ok) throw new Error("题库加载失败，请稍后重试");
  return res.json() as Promise<Question[]>;
}
