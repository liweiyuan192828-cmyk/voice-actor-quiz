export const APP = { name: "声优鉴定局", subtitle: "VOICE ACTOR QUIZ", requireAudioPlayed: process.env.NEXT_PUBLIC_REQUIRE_AUDIO_PLAYED !== "false" };
export const gradeFor = (score: number) => score >= 12 ? "S" : score >= 7 ? "A" : score >= 2 ? "B" : "C";
