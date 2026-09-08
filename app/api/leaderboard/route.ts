import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase";
export async function GET() { try { const { data, error } = await adminSupabase().from("quiz_records").select("nickname,total_score,accuracy,correct_count,category,created_at").not("nickname","is",null).order("total_score",{ascending:false}).order("accuracy",{ascending:false}).order("created_at",{ascending:true}).limit(50); if(error) throw error; return NextResponse.json(data); } catch { return NextResponse.json({ error:"排行榜暂时无法加载" },{status:500}); } }
