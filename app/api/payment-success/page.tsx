"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const params = useSearchParams();

  useEffect(() => {
    const uid = params.get("uid");

    if (uid) {
      fetch("/api/mark-paid", {
        method: "POST",
        body: JSON.stringify({ user_id: uid }),
      });
    }
  }, []);

  return <h1>تم الدفع بنجاح 🎉</h1>;
}