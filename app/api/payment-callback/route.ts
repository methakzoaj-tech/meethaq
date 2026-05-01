import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.formData();

  const status = body.get("status");
  const amount = body.get("amount");
  const details = body.get("paymentdetails");

  console.log("UPAY CALLBACK:", Object.fromEntries(body));

  // استخراج user_id من paymentdetails
  let user_id = null;

  if (details && typeof details === "string") {
    const match = details.match(/user:(.*)/);
    if (match) {
      user_id = match[1];
    }
  }

  if (status === "success" && user_id) {
    await supabase
      .from("submissions")
      .update({
        payment_status: "paid",
        payment_amount: Number(amount),
        payment_date: new Date(),
      })
      .eq("user_id", user_id);
  }

  return NextResponse.json({ success: true });
}