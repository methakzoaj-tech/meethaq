import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { answers, user_id } = await req.json();

    // 1. إنشاء submission
    const { data: submission, error: subError } = await supabase
      .from("submissions")
      .insert({
        user_id,
      })
      .select()
      .single();

    if (subError) {
      return NextResponse.json({ error: subError.message });
    }

    // 2. تحويل الإجابات
    const answersToInsert = Object.entries(answers).map(
      ([question_id, answer]) => ({
        submission_id: submission.id,
        question_id: Number(question_id),
        answer: String(answer),
      })
    );

    // 3. إدخال الإجابات
    const { error } = await supabase
      .from("answers")
      .insert(answersToInsert);

    if (error) {
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}