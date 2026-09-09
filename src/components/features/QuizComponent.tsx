import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Star, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import type { QuizQuestion } from "@/data/quiz";

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  titleUrdu?: string;
  onComplete?: (score: number, total: number) => void;
}

export default function QuizComponent({
  questions,
  title = "Quiz Time!",
  titleUrdu = "کوئز کا وقت!",
  onComplete,
}: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(true);
  const { speak, isSupported } = useTextToSpeech();

  const q = questions[current];

  useEffect(() => {
    setTimeLeft(20);
    setTimerActive(true);
  }, [current]);

  useEffect(() => {
    if (!timerActive || answered || completed) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timerActive, answered, completed]);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setTimerActive(false);
    const isCorrect = idx === q.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      toast.success("🎉 Correct! / درست!", { duration: 1500 });
    } else {
      toast.error("❌ Try again next time! / اگلی بار کوشش کریں!", { duration: 1500 });
    }
    setAnswers((prev) => {
      const a = [...prev];
      a[current] = idx;
      return a;
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((p) => p + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setCompleted(true);
      onComplete?.(score, questions.length);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
    setTimeLeft(20);
    setTimerActive(true);
  };

  const percentage = Math.round((score / questions.length) * 100);
  const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 40 ? 1 : 0;

  if (completed) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-border text-center slide-in">
        <div className="text-7xl mb-4">{percentage >= 70 ? "🏆" : percentage >= 50 ? "🌟" : "📚"}</div>
        <h2 className="text-2xl font-extrabold text-green-800 mb-1">Quiz Complete!</h2>
        <p className="text-xl font-bold text-amber-600 mb-4" dir="rtl">کوئز مکمل!</p>

        {/* Score circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke={percentage >= 70 ? "#16a34a" : percentage >= 50 ? "#f59e0b" : "#ef4444"}
              strokeWidth="10"
              strokeDasharray={`${(percentage / 100) * 314} 314`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-green-800">{score}</span>
            <span className="text-xs text-muted-foreground">/{questions.length}</span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              size={32}
              className={s <= stars ? "text-amber-400 fill-amber-400" : "text-gray-200"}
            />
          ))}
        </div>

        <p className="text-lg font-bold text-gray-800 mb-1">
          {percentage >= 80
            ? "Excellent! ماشاءاللہ!"
            : percentage >= 60
            ? "Good job! شاباش!"
            : "Keep learning! سیکھتے رہو!"}
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          You scored {score} out of {questions.length} questions ({percentage}%)
        </p>

        {/* Review */}
        <div className="text-left space-y-2 mb-6">
          {questions.map((q, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                answers[i] === q.correctIndex
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {answers[i] === q.correctIndex ? (
                <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-gray-800">{q.question}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  ✅ {q.options[q.correctIndex]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-3 gradient-hero text-white rounded-2xl font-bold hover:opacity-90 transition-all btn-bounce"
        >
          <RotateCcw size={16} />
          Try Again / دوبارہ کوشش کریں
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="gradient-hero p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-extrabold">{title}</p>
          <p className="text-amber-300 text-sm font-bold" dir="rtl">{titleUrdu}</p>
        </div>
        <div className="text-right">
          <p className="text-white text-sm font-bold">
            {current + 1} / {questions.length}
          </p>
          <div className={`text-xl font-extrabold ${timeLeft <= 5 ? "text-red-300 animate-pulse" : "text-amber-300"}`}>
            ⏱ {timeLeft}s
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-green-100">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${((current) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6 space-y-5">
        {/* Score */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Trophy size={14} className="text-amber-500" />
            Score: {score}
          </div>
          <div className="flex gap-1">
            {questions.slice(0, current).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  answers[i] === questions[i].correctIndex ? "bg-green-500" : "bg-red-400"
                }`}
              />
            ))}
            {questions.slice(current).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-extrabold text-lg text-green-900 leading-snug">{q.question}</p>
              <p className="text-base text-green-700 font-semibold mt-1" dir="rtl">{q.questionUrdu}</p>
            </div>
            {isSupported && (
              <button
                onClick={() => speak(`${q.question}. ${q.questionUrdu}`, "ur-PK")}
                className="p-2 rounded-xl bg-sky-100 text-sky-600 hover:bg-sky-200 transition-all flex-shrink-0"
              >
                <Volume2 size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = i === selected;
            let cls = "border-2 border-border bg-white hover:border-green-300 hover:bg-green-50";
            if (answered) {
              if (isCorrect) cls = "border-2 border-green-500 bg-green-50";
              else if (isSelected) cls = "border-2 border-red-400 bg-red-50";
              else cls = "border-2 border-gray-100 bg-gray-50 opacity-60";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-sm text-left transition-all btn-bounce ${cls}`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                  answered && isCorrect
                    ? "bg-green-500 text-white"
                    : answered && isSelected && !isCorrect
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {answered && isCorrect ? "✓" : answered && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <div className="flex-1">
                  <span className="text-gray-800">{opt}</span>
                  <span className="block text-xs text-gray-500 text-right" dir="rtl">{q.optionsUrdu[i]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div className={`rounded-2xl p-4 border-2 slide-in ${
            selected === q.correctIndex
              ? "bg-green-50 border-green-300"
              : "bg-amber-50 border-amber-300"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selected === q.correctIndex ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-red-500" />
              )}
              <span className="font-extrabold text-sm text-gray-800">
                {selected === q.correctIndex ? "✅ Correct!" : "💡 Explanation:"}
              </span>
            </div>
            <p className="text-sm text-gray-700">{q.explanation}</p>
            <p className="text-sm text-gray-600 text-right mt-1" dir="rtl">{q.explanationUrdu}</p>
          </div>
        )}

        {/* Next Button */}
        {answered && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-4 gradient-gold text-white rounded-2xl font-extrabold transition-all btn-bounce slide-in"
          >
            {current < questions.length - 1 ? (
              <>Next Question / اگلا سوال <ChevronRight size={18} /></>
            ) : (
              <>See Results / نتائج دیکھیں <Trophy size={18} /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
