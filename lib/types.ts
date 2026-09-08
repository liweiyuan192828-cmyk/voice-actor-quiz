export type Answer = "yes" | "no" | "unknown";
export type Question = { id: string; title: string; audio_url: string; correct_answer: Exclude<Answer, "unknown">; score: number; penalty: number; category: string; note: string | null; is_active: boolean; created_at: string };
export type QuizRecord = { total_score: number; correct_count: number; wrong_count: number; unknown_count: number; accuracy: number; category: string | null };
export const ANSWER_LABEL: Record<Answer, string> = { yes: "是", no: "不是", unknown: "不知道" };
