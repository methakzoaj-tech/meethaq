"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentContent() {
  const params = useSearchParams();

  useEffect(() => {
    const uid = params.get("uid");

    if (!uid) return;

    const markPaid = async () => {
      try {
        const res = await fetch("/api/mark-paid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: uid }),
        });

        const data = await res.json();
        console.log("Payment saved:", data);
      } catch (err) {
        console.error("Error saving payment:", err);
      }
    };

    markPaid();
  }, [params]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f3ed]">
      <h1 className="text-2xl font-bold text-[#2f2f2f]">
        تم الدفع بنجاح 🎉
      </h1>
    </main>
  );
}