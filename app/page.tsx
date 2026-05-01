export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl text-center">

        {/* الشعار */}
        <img
          src="/logo.png"
          alt="ميثاق"
          className="mx-auto mb-6 w-40"
        />

        {/* العنوان */}
        <h1 className="text-3xl font-bold mb-4 leading-relaxed">
          مرحباً بك في رحلة بناء <br /> "ميثاق غليظ"
        </h1>

        {/* النص */}
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          أهلاً بك في ميثاق. حيث نبدأ من حيث ينتهي الآخرون.. نحن لا نبحث عن مجرد توافق شكلي،
          بل نسعى لبناء أسرة مسلمة قائمة على رسوخ القيم وتناغم النفوس.
          <br /><br />
          استبيانك هو بوابتك الأولى؛ نرجو منك منحه الوقت والصدق والتركيز،
          فكل إجابة هي لبنة في بناء بيتك المستقبلي.
          <br /><br />
          بياناتك تُحاط بأقصى درجات الخصوصية والسرية،
          ولن يطلع عليها إلا فريق الإشراف المختص والذكاء الاصطناعي لغرض التوفيق القيمي فقط.
        </p>

        {/* زر البدء */}
        <a
          href="/survey/start"
          className="block bg-[#c49b3f] hover:bg-[#b38a32] text-white px-8 py-4 rounded-lg text-lg font-semibold"
        >
          توكلت على الله.. ابدأ الاستبيان
        </a>
      </div>
    </main>
  );
}
