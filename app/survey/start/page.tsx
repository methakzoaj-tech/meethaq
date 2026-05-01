"use client";
export default function StartSurvey() {
  // دالة حفظ الجنس + الانتقال
  const handleSelect = async (gender: string) => {
    await fetch('/api/save-gender', {
      method: 'POST',
      body: JSON.stringify({ gender }),
    });

    window.location.href = `/survey/${gender}`;
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

        {/* الشعار */}
        <img
          src="/logo.png"
          alt="ميثاق"
          className="mx-auto mb-6 w-28"
        />

        {/* العنوان */}
        <h1 className="text-2xl font-bold mb-3">
          من أنت؟
        </h1>

        {/* النص التوضيحي */}
        <p className="text-gray-600 mb-8">
          سيظهر لك الاستبيان المناسب بناءً على اختيارك
        </p>

        {/* خيارات الجنس */}
        <div className="flex flex-row gap-6 justify-center">

          {/* زر المرأة */}
          <button
            onClick={() => handleSelect('female')}
            className="flex flex-col items-center justify-center bg-[#f7f7f7] hover:bg-[#ececec] border border-gray-300 py-6 px-6 rounded-xl w-32 h-32 text-lg font-semibold"
          >
            <span className="text-4xl mb-2">👩‍🦰</span>
            <span>امرأة</span>
          </button>

          {/* زر الرجل */}
          <button
            onClick={() => handleSelect('male')}
            className="flex flex-col items-center justify-center bg-[#f7f7f7] hover:bg-[#ececec] border border-gray-300 py-6 px-6 rounded-xl w-32 h-32 text-lg font-semibold"
          >
            <span className="text-4xl mb-2">👨‍🦱</span>
            <span>رجل</span>
          </button>

        </div>

        {/* زر العودة */}
        <a
          href="/"
          className="block mt-6 text-gray-500 hover:text-gray-700 text-sm"
        >
          ← العودة
        </a>

      </div>
    </main>
  );
}
