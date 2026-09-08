import { QuizClient } from "@/components/QuizClient";
export default async function QuizPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) { const { category = "综合" } = await searchParams; return <QuizClient category={category} />; }
