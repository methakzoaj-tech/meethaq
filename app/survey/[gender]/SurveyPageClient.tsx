"use client";

import { useEffect, useState } from "react";

type Question = {
  id: number;
  section: string;
  question: string;
  hint?: string;
  type: string;
  options?: string[];
  required?: boolean;
};

export default function SurveyPageClient({ gender }: { gender: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
  let id = localStorage.getItem("user_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }

  return id;
};
  useEffect(() => {

    const loadQuestions = async () => {
      const res = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify({ gender }),
      });

      const data = await res.json();
      setQuestions(data.questions || []);
      setLoading(false);
    };

    loadQuestions();
  }, [gender]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
        <p className="text-lg font-semibold">جاري تحميل الأسئلة...</p>
      </main>
    );
  }

  if (!questions.length) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
        <p className="text-lg font-semibold">لا توجد أسئلة متاحة حالياً.</p>
      </main>
    );
  }

  const question = questions[currentIndex];

  // 🔍 مهم جداً: نشوف القيمة الحقيقية
  console.log("TYPE RAW:", `"${question.type}"`);

  const type = question.type?.trim().toLowerCase();

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [question.id]: value });
  };

const next = async () => {
  if (question.required && (!answers[question.id] && answers[question.id] !== 0)) {
    alert("الرجاء الإجابة قبل المتابعة");
    return;
  }

  // 🔥 إذا آخر سؤال
  if (currentIndex === questions.length - 1) {
    await submitSurvey();

    // 🔥 بعد الحفظ نروح لصفحة النتيجة
    if (gender === "female") {
      window.location.href = "/thanks-female";
    } else {
      window.location.href = "/thanks-male";
    }

    return;
  }

  setCurrentIndex(currentIndex + 1);
};

  const back = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitSurvey = async () => {
  const user_id = getUserId();

  try {
    const res = await fetch("/api/save-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers,
        user_id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("تم حفظ الإجابات بنجاح ✅");
    }
  } catch (err) {
    console.error(err);
    alert("حدث خطأ أثناء الحفظ");
  }
};

  const renderInput = () => {
    switch (type) {
      case "short_text":
        return (
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        );

      case "number":

  return (
    <input
      type="number"
      className="w-full border border-gray-300 rounded-lg p-3"
      value={answers[question.id] ?? ""}
      onChange={(e) =>
        handleAnswer(e.target.value === "" ? "" : Number(e.target.value))
      }
    />
  );

case "phone":
  return (
    <input
      type="tel"
      className="w-full border border-gray-300 rounded-lg p-3"
      value={answers[question.id] || ""}
      onChange={(e) => handleAnswer(e.target.value)}
      placeholder="05xxxxxxxx"
    />
  );

      case "long_text":
        return (
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 h-32"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        );

      case "select":
        return (
          <div className="space-y-3">
            {question.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  checked={answers[question.id] === opt}
                  onChange={() => handleAnswer(opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <p className="text-red-500">
            نوع غير مدعوم: {question.type}
          </p>
        );
    }
  };

  return (
  <main className="min-h-screen flex flex-col items-center bg-[#f7f3ed] px-4 py-10">

    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-right border border-[#e5dfd5]">

      {/* القسم */}
      <h2 className="text-[#c89b3c] text-sm mb-2 font-semibold">
        {question.section}
      </h2>

      {/* السؤال */}
      <h1 className="text-xl font-bold mb-3 text-[#2f2f2f]">
        {question.question}
      </h1>

      {/* الوصف */}
      {question.hint && (
        <p className="text-gray-500 text-sm mb-5">
          {question.hint}
        </p>
      )}

      {/* الإدخال */}
      <div className="mb-6">
        {question.type?.trim().toLowerCase() === "select" ? (
          <div className="grid grid-cols-2 gap-4">
            {question.options?.map((opt, i) => {
              const selected = answers[question.id] === opt;

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={`
                    border rounded-xl py-4 px-3 text-sm transition
                    ${selected
                      ? "bg-[#f7efe5] border-[#c89b3c] text-[#3a3a3a] font-semibold"
                      : "bg-white border-gray-300 hover:border-[#c89b3c]"
                    }
                  `}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          renderInput()
        )}
      </div>

      {/* الأزرار */}
      <div className="flex justify-between items-center mt-8">

  

        {/* السابق */}
        <button
          onClick={back}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 border border-gray-400 px-5 py-2 rounded-lg text-gray-600 disabled:opacity-40"
        >
          رجوع →
        </button>

              {/* التالي */}
        <button
          onClick={next}
          className="flex items-center gap-2 bg-[#c89b3c] text-white px-5 py-2 rounded-lg disabled:opacity-40"
        >
          {currentIndex === questions.length - 1 ? (
            <>إنهاء الاستبيان ✓</>
          ) : (
            <>التالي ←</>
          )}
        </button>

      </div>

      {/* progress bar */}
      <div className="mt-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-[#c89b3c] rounded-full transition-all"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <p className="text-center text-gray-500 text-sm mt-2">
          {currentIndex + 1} / {questions.length}
        </p>
      </div>

    </div>
  </main>
);
}