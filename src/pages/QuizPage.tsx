import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, BookOpen, Brain, Star, ArrowRight, Shuffle } from "lucide-react";
import QuizComponent from "@/components/features/QuizComponent";
import { GENERAL_QUIZ_QUESTIONS } from "@/data/quiz";
import { ALL_STORIES } from "@/data/stories";
import { getQuizForStory } from "@/data/quiz";

const QUIZ_CATEGORIES = [
  { id: "general", label: "General Islamic Quiz", labelUrdu: "عمومی اسلامی کوئز", emoji: "🕌", desc: "Test your Islamic knowledge", count: GENERAL_QUIZ_QUESTIONS.length },
  { id: "stories", label: "Story Quizzes", labelUrdu: "کہانی کوئز", emoji: "📖", desc: "Quiz based on stories you've read", count: ALL_STORIES.filter((s) => !!s.id).length },
];

export default function QuizPage() {
  const [selectedMode, setSelectedMode] = useState<"select" | "story-pick" | "playing">("select");
  const [questions, setQuestions] = useState(GENERAL_QUIZ_QUESTIONS);
  const [quizTitle, setQuizTitle] = useState("Islamic Knowledge Quiz");
  const [quizTitleUrdu, setQuizTitleUrdu] = useState("اسلامی علم کوئز");
  const [score, setScore] = useState<{ score: number; total: number } | null>(null);

  const startGeneralQuiz = () => {
    const shuffled = [...GENERAL_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setQuizTitle("Islamic Knowledge Quiz");
    setQuizTitleUrdu("اسلامی علم کوئز");
    setSelectedMode("playing");
    setScore(null);
  };

  const startStoryQuiz = (storyId: string, storyTitle: string, storyTitleUrdu: string) => {
    const qs = getQuizForStory(storyId);
    setQuestions(qs);
    setQuizTitle(`Quiz: ${storyTitle}`);
    setQuizTitleUrdu(storyTitleUrdu);
    setSelectedMode("playing");
    setScore(null);
  };

  if (selectedMode === "playing") {
    return (
      <div className="min-h-screen">
        <div className="gradient-hero py-8 px-4 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-1">🧠 Quiz Time!</h1>
          <p className="text-amber-300 text-xl font-bold" dir="rtl">کوئز کا وقت!</p>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <QuizComponent
            questions={questions}
            title={quizTitle}
            titleUrdu={quizTitleUrdu}
            onComplete={(s, total) => setScore({ score: s, total })}
          />
          {score && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setSelectedMode("select")}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                Back to Quizzes / کوئزز پر واپس
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedMode === "story-pick") {
    return (
      <div className="min-h-screen">
        <div className="gradient-hero py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedMode("select")}
              className="text-green-200 hover:text-white mb-4 text-sm flex items-center gap-1 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-extrabold text-white mb-1">Choose Story Quiz</h1>
            <p className="text-amber-300 font-bold" dir="rtl">کہانی کا کوئز منتخب کریں</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ALL_STORIES.map((story) => (
              <button
                key={story.id}
                onClick={() => startStoryQuiz(story.id, story.title, story.titleUrdu)}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-border text-left hover:border-green-300 hover:shadow-md transition-all btn-bounce group"
              >
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-green-700">
                    {story.title}
                  </h3>
                  <p className="text-xs text-amber-600 font-semibold" dir="rtl">{story.titleUrdu}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                      {getQuizForStory(story.id).length} questions
                    </span>
                    <span className="text-xs text-muted-foreground">Age {story.ageGroup}</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-green-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero pattern-stars py-14 px-4 text-center">
        <div className="text-6xl mb-4 floating">🧠</div>
        <h1 className="text-4xl font-extrabold text-white mb-2">Islamic Quiz Zone</h1>
        <p className="text-3xl font-bold text-amber-300 mb-2" dir="rtl">اسلامی کوئز زون</p>
        <p className="text-green-200 max-w-xl mx-auto text-sm">
          Test your knowledge of Islam, stories, and Islamic values with fun interactive quizzes!
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Stats banner */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Brain, value: GENERAL_QUIZ_QUESTIONS.length + "+", label: "Questions", labelUrdu: "سوالات", color: "bg-violet-100 border-violet-300 text-violet-700" },
            { icon: BookOpen, value: ALL_STORIES.length, label: "Story Quizzes", labelUrdu: "کہانی کوئز", color: "bg-green-100 border-green-300 text-green-700" },
            { icon: Trophy, value: "3⭐", label: "Max Stars", labelUrdu: "زیادہ سے زیادہ", color: "bg-amber-100 border-amber-300 text-amber-700" },
          ].map(({ icon: Icon, value, label, labelUrdu, color }) => (
            <div key={label} className={`${color} border-2 rounded-2xl p-4 text-center`}>
              <Icon size={20} className="mx-auto mb-1" />
              <p className="font-extrabold text-xl">{value}</p>
              <p className="text-xs font-bold">{label}</p>
              <p className="text-xs opacity-70" dir="rtl">{labelUrdu}</p>
            </div>
          ))}
        </div>

        {/* Quiz Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Quiz */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-border hover:border-green-300 transition-all">
            <div className="text-center mb-5">
              <span className="text-5xl block mb-3">🕌</span>
              <h2 className="text-xl font-extrabold text-green-800">General Islamic Quiz</h2>
              <p className="text-amber-600 font-bold text-sm mt-1" dir="rtl">عمومی اسلامی کوئز</p>
              <p className="text-muted-foreground text-sm mt-2">
                Test your knowledge about Islam, Quran, Duas, and Islamic practices
              </p>
            </div>
            <div className="space-y-2 mb-5">
              {[
                "5 random questions per session",
                "Covers Islamic pillars, Duas, Prophets",
                "Earn up to 3 stars",
                "Available in Urdu & English",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={startGeneralQuiz}
              className="w-full py-4 gradient-hero text-white font-extrabold rounded-2xl btn-bounce shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Shuffle size={16} />
              Start Quiz / کوئز شروع کریں
            </button>
          </div>

          {/* Story Quiz */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-border hover:border-amber-300 transition-all">
            <div className="text-center mb-5">
              <span className="text-5xl block mb-3">📖</span>
              <h2 className="text-xl font-extrabold text-amber-800">Story Quiz</h2>
              <p className="text-amber-600 font-bold text-sm mt-1" dir="rtl">کہانی کوئز</p>
              <p className="text-muted-foreground text-sm mt-2">
                Take a quiz based on stories you've read — test your comprehension!
              </p>
            </div>
            <div className="space-y-2 mb-5">
              {[
                `${ALL_STORIES.length} different story quizzes`,
                "Comprehension questions per story",
                "Explanation for each answer",
                "20-second timer per question",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-amber-500">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedMode("story-pick")}
              className="w-full py-4 gradient-gold text-white font-extrabold rounded-2xl btn-bounce shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={16} />
              Pick a Story / کہانی منتخب کریں
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h3 className="font-extrabold text-green-800 mb-3">
            💡 Quiz Tips / کوئز کے مشورے
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
            {[
              { tip: "Read stories before taking their quiz", tipUrdu: "کوئز سے پہلے کہانی پڑھیں" },
              { tip: "You have 20 seconds per question", tipUrdu: "فی سوال 20 سیکنڈ ملتے ہیں" },
              { tip: "Score 80%+ to earn 3 stars", tipUrdu: "3 ستارے کے لیے 80% سے زیادہ چاہیے" },
              { tip: "Read explanations to learn more", tipUrdu: "مزید جاننے کے لیے وضاحت پڑھیں" },
            ].map(({ tip, tipUrdu }) => (
              <div key={tip} className="flex gap-2">
                <span className="text-amber-500 font-bold">✦</span>
                <div>
                  <p className="font-semibold">{tip}</p>
                  <p className="text-xs text-green-600" dir="rtl">{tipUrdu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
