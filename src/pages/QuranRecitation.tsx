import { useState } from "react";
import { BookOpen, Play, Volume2, Star, Clock, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { QURAN_SURAHS, DUAS } from "@/data/quran";
import { toast } from "sonner";

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-700 border-green-300",
  medium: "bg-amber-100 text-amber-700 border-amber-300",
  advanced: "bg-violet-100 text-violet-700 border-violet-300",
};

export default function QuranRecitation() {
  const [selectedSurah, setSelectedSurah] = useState<typeof QURAN_SURAHS[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"surahs" | "duas">("surahs");
  const [expandedDua, setExpandedDua] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "advanced">("all");
  const { speak, stop, isPlaying, isSupported } = useTextToSpeech({ rate: 0.65, pitch: 0.95 });

  const filtered = QURAN_SURAHS.filter(
    (s) => filter === "all" || s.difficulty === filter
  );

  const handleRecite = (text: string, name: string) => {
    if (isPlaying) {
      stop();
    } else {
      toast.info(`🎙️ Reciting ${name}...`);
      speak(text, "ar-SA");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero pattern-stars py-14 px-4 text-center">
        <div className="text-6xl mb-4 floating">📖</div>
        <h1 className="text-4xl font-extrabold text-white mb-2">Quran Recitation</h1>
        <p className="text-3xl font-bold text-amber-300 mb-2" dir="rtl" style={{ fontFamily: "serif" }}>
          تلاوت قرآن کریم
        </p>
        <p className="text-green-200 max-w-xl mx-auto">
          Learn and recite Surahs with pronunciation guides, translations, and audio support
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-2 rounded-full text-sm font-bold">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          {QURAN_SURAHS.length} Surahs • {DUAS.length} Daily Duas
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-2xl">
          {(["surahs", "duas"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all capitalize ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-green-700"
              }`}
            >
              {tab === "surahs" ? "📖 Surahs / سورتیں" : "🤲 Daily Duas / روزانہ کی دعائیں"}
            </button>
          ))}
        </div>

        {activeTab === "surahs" && (
          <>
            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["all", "easy", "medium", "advanced"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all btn-bounce ${
                    filter === f
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-white border border-border text-muted-foreground hover:border-green-300"
                  }`}
                >
                  {f === "all" ? "🌟 All" : f === "easy" ? "🟢 Easy" : f === "medium" ? "🟡 Medium" : "🔵 Advanced"}
                </button>
              ))}
            </div>

            {/* Surahs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {filtered.map((surah) => (
                <div
                  key={surah.number}
                  className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${
                    selectedSurah?.number === surah.number
                      ? "border-green-500 shadow-xl"
                      : "border-border card-hover cursor-pointer hover:border-green-200"
                  }`}
                  onClick={() => setSelectedSurah(selectedSurah?.number === surah.number ? null : surah)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Number badge */}
                      <div className="w-12 h-12 gradient-hero rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-white font-extrabold text-sm leading-none">{surah.number}</span>
                        <span className="text-green-200 text-xs">No.</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{surah.emoji}</span>
                            <h3 className="font-extrabold text-gray-900">{surah.name}</h3>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-bold capitalize ${DIFFICULTY_COLORS[surah.difficulty]}`}>
                            {surah.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span className="font-bold text-lg text-amber-700" dir="rtl" style={{ fontFamily: "serif" }}>
                            {surah.nameArabic}
                          </span>
                          <span className="text-xs">•</span>
                          <span>{surah.meaning}</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen size={10} />
                            {surah.verses} verses
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            surah.type === "Meccan"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {surah.type}
                          </span>
                          <span>Age: {surah.ageGroup}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded content */}
                    {selectedSurah?.number === surah.number && (
                      <div className="mt-4 space-y-4 slide-in border-t border-green-100 pt-4">
                        {/* Arabic verse */}
                        <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
                          <p className="text-2xl text-green-900 font-bold leading-loose" dir="rtl" style={{ fontFamily: "serif" }}>
                            {surah.firstVerse}
                          </p>
                          <p className="text-sm text-amber-700 font-bold mt-2" dir="rtl">
                            {surah.firstVerseUrdu}
                          </p>
                          <p className="text-sm text-gray-600 mt-2 italic">
                            "{surah.firstVerseTranslation}"
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                          {isSupported && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRecite(surah.firstVerse, surah.name);
                              }}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all btn-bounce ${
                                isPlaying
                                  ? "bg-red-50 border-2 border-red-300 text-red-600"
                                  : "bg-sky-50 border-2 border-sky-300 text-sky-700 hover:border-sky-400"
                              }`}
                            >
                              <Volume2 size={14} />
                              {isPlaying ? "Stop" : "🎙️ Listen / سنیں"}
                            </button>
                          )}
                          <a
                            href={`https://quran.com/${surah.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-all"
                          >
                            <ExternalLink size={14} />
                            Full Surah
                          </a>
                        </div>

                        <div className="text-center text-xs text-muted-foreground">
                          🌐 Opens Quran.com for complete recitation with audio
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Tajweed Tips */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <h3 className="text-xl font-extrabold text-amber-800 mb-4">
                📚 Tajweed Tips for Children / بچوں کے لیے تجوید کے مشورے
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { tip: "Start with Bismillah before every Surah", tipUrdu: "ہر سورہ سے پہلے بسم اللہ پڑھیں" },
                  { tip: "Read slowly and clearly", tipUrdu: "آہستہ اور واضح طور پر پڑھیں" },
                  { tip: "Practice Madd (elongation) sounds", tipUrdu: "مد کی آوازوں کی مشق کریں" },
                  { tip: "Sit respectfully when reading Quran", tipUrdu: "قرآن پڑھتے وقت احترام سے بیٹھیں" },
                ].map(({ tip, tipUrdu }) => (
                  <div key={tip} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0">✦</span>
                    <div>
                      <p className="text-sm text-amber-800 font-semibold">{tip}</p>
                      <p className="text-xs text-amber-600 text-right" dir="rtl">{tipUrdu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "duas" && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <p className="text-green-800 font-bold text-center">
                🤲 Daily Duas for Muslim Children
              </p>
              <p className="text-green-700 text-sm text-center" dir="rtl">
                مسلمان بچوں کے لیے روزانہ کی دعائیں
              </p>
            </div>

            {DUAS.map((dua) => (
              <div key={dua.id} className="bg-white rounded-2xl border-2 border-border overflow-hidden">
                <button
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-green-50 transition-colors"
                  onClick={() => setExpandedDua(expandedDua === dua.id ? null : dua.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dua.emoji}</span>
                    <div>
                      <h3 className="font-extrabold text-gray-900">{dua.name}</h3>
                      <p className="text-sm text-amber-600 font-bold" dir="rtl">{dua.nameUrdu}</p>
                    </div>
                  </div>
                  {expandedDua === dua.id ? (
                    <ChevronUp size={18} className="text-green-600" />
                  ) : (
                    <ChevronDown size={18} className="text-muted-foreground" />
                  )}
                </button>

                {expandedDua === dua.id && (
                  <div className="px-4 pb-4 space-y-3 slide-in border-t border-green-100 pt-4">
                    <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-200">
                      <p className="text-2xl text-green-900 leading-loose font-bold" dir="rtl" style={{ fontFamily: "serif" }}>
                        {dua.arabic}
                      </p>
                      <p className="text-base text-amber-700 font-semibold mt-2" dir="rtl">
                        {dua.urdu}
                      </p>
                      <p className="text-sm text-gray-600 italic mt-2">"{dua.translation}"</p>
                    </div>

                    {isSupported && (
                      <button
                        onClick={() => handleRecite(dua.arabic, dua.name)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-sky-50 border-2 border-sky-200 text-sky-700 rounded-xl font-bold text-sm hover:border-sky-400 transition-all btn-bounce"
                      >
                        <Volume2 size={14} />
                        {isPlaying ? "Stop" : "Listen / سنیں"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
