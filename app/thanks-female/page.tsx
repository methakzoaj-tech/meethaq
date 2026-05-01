"use client";
export default function ThanksFemale() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7f3ed] px-4">

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-[#e5dfd5]">

        <div className="text-4xl mb-4">🌿</div>

        <h1 className="text-2xl font-bold text-[#2f2f2f] mb-3">
          جزاكِ الله خيرًا
        </h1>

        <div className="h-1 w-16 bg-[#c89b3c] mx-auto mb-6 rounded"></div>

        <div className="bg-[#f3eadf] text-[#6b5b3e] py-3 px-4 rounded-lg mb-6">
          🎁 التسجيل للمرأة مجاني تماماً في ميثاق
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          لقد أكملتِ الاستبيان بنجاح، إجاباتك أودعت بأمانة وستعالج بسرية تامة من فريق ميثاق.
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          نسأل الله أن ييسر أمرك ويرزقك شريك حياة يعينك ويسعد قلبك.
        </p>

        <p className="text-[#c89b3c] font-semibold">
          (وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا)
        </p>

        <br />
        {/* رجوع */}
        <button
          onClick={() => window.location.href = "/survey/male"}
          className="w-full border border-gray-400 py-3 rounded-xl text-gray-600"
        >
          ← العودة للاستبيان
        </button>

      </div>
    </main>
  );
}