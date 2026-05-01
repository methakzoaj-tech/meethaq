"use client";

import { useEffect, useState } from "react";

export default function ThanksMale() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("user_id");

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("user_id", id);
    }

    setUserId(id);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f3ed] px-4">

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-[#e5dfd5]">

        {/* أيقونة */}
        <div className="text-4xl mb-3">💳</div>

        {/* العنوان */}
        <h1 className="text-2xl font-bold text-[#2f2f2f] mb-2">
          إتمام التسجيل
        </h1>

        <div className="h-1 w-16 bg-[#c89b3c] mx-auto mb-6 rounded"></div>

        {/* البوكس الرئيسي */}
        <div className="bg-[#f9f7f3] border border-[#e5dfd5] rounded-xl p-5 text-right mb-6">

          <p className="text-gray-700 mb-3">
            💰 <span className="font-semibold">الدفعة الأولى:</span> 450 شيكل — تُدفع عبر الرابط المرفق أو عبر التواصل معنا على واتساب.
          </p>

          <p className="text-gray-700 mb-4">
            📋 <span className="font-semibold">المبلغ الإجمالي:</span> 950 شيكل للعملية كاملة.
          </p>

          <hr className="my-4" />

          <ul className="text-sm text-gray-600 space-y-2 text-right">
            <li>🔸 يتم معالجة الاستبيان بعد دفع الرسوم الأولية (450 ₪)</li>
            <li>🔸 تستلم الترشيحات بعد إتمام كامل المبلغ (950 ₪)</li>
            <li>🔸 يمكن دفع المبلغ كاملًا من البداية إن أردت</li>
          </ul>

        </div>

        {/* اختيار الدفع */}
        <p className="text-gray-700 font-semibold mb-4">
          اختر طريقة الدفع:
        </p>
        
        <div className="space-y-3">
        {/* زر الدفع الأولي */}
        {userId && (
          <form action="https://app.upay.co.il/API6/clientsecure/redirectpage.php" method="post">
            <input type="hidden" name="email" value="manalsirhan000@gmail.com" />
            <input type="hidden" name="amount" value="450" />
            <input type="hidden" name="paymentdetails" value={`دفع رسوم التسجيل الاولية - ميثاق - user: ${userId}`} />
            <input type="hidden" name="currency" value="NIS" />
            <input type="hidden" name="lang" value="EN" />
            <input type="hidden" name="livesystem" value="1" />
            <input
                type="hidden"
                name="returnurl"
                value={`http://localhost:3000/payment-success?uid=${userId}`}
                />
            
            <button className="w-full bg-[#c89b3c] text-white py-3 rounded-xl">
             دفع رسوم التسجيل الأولية
             <div className="text-sm opacity-90">₪450 - معالجة الاستبيان </div>
                 
            </button>

            <br />
          </form>
        )}

        {/* زر الدفع الكامل */}

                  <form action="https://app.upay.co.il/API6/clientsecure/redirectpage.php" method="post">
            <input type="hidden" name="email" value="manalsirhan000@gmail.com" />
            <input type="hidden" name="amount" value="950" />
            <input type="hidden" name="paymentdetails" value={`دفع المبلغ الإجمالي كامل - ميثاق - user: ${userId}`} />
            <input type="hidden" name="currency" value="NIS" />
            <input type="hidden" name="lang" value="EN" />
            <input type="hidden" name="livesystem" value="1" />
            <input
                type="hidden"
                name="returnurl"
                value={`http://localhost:3000/payment-success?uid=${userId}`}
                />

            <button
          className="w-full mb-5 bg-[#2e4a3f] text-white py-4 rounded-xl font-semibold text-lg shadow"
        >
          دفع المبلغ الإجمالي كامل
          <div className="text-sm opacity-90">950 ₪ — شامل الترشيحات</div>
        </button>

            <br />
          </form>
       

        {/* رجوع */}
        <button
          onClick={() => window.location.href = "/survey/male"}
          className="w-full border border-gray-400 py-3 rounded-xl text-gray-600"
        >
          ← العودة للاستبيان
        </button>
</div>
      </div>
    </main>
  );
}