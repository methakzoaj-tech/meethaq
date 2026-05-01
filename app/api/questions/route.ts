import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { gender } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1) أسئلة all بدون السؤال رقم 0
    const { data: both, error: bothError } = await supabase
      .from("questions")
      .select("*")
      .eq("target", "all")
      .gt("order_number", 0) // ← استبعاد سؤال "من أنت؟"
      .order("order_number", { ascending: true });

    if (bothError) {
      console.error("Supabase error (both):", bothError);
      return NextResponse.json({ error: bothError.message }, { status: 500 });
    }

    // 2) أسئلة الجندر المحدد
    const { data: specific, error: specificError } = await supabase
      .from("questions")
      .select("*")
      .eq("target", gender)
      .order("order_number", { ascending: true });

    if (specificError) {
      console.error("Supabase error (specific):", specificError);
      return NextResponse.json({ error: specificError.message }, { status: 500 });
    }

    // 3) دمج الأسئلة
    const questions = [...(both || []), ...(specific || [])];

    return NextResponse.json({ questions });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
