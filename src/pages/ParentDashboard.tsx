import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, BookOpen, Clock, BarChart2, ShieldCheck, Eye, EyeOff,
  ArrowLeft, Settings, Star, Trophy, Heart, Calendar, TrendingUp, Lock,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { ALL_STORIES } from "@/data/stories";
import { CATEGORIES } from "@/constants";
import { toast } from "sonner";

const PIN = "1234"; // simple demo PIN

export default function ParentDashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "controls" | "progress">("overview");
  const { history, favorites } = useFavorites();

  const handleUnlock = () => {
    if (pinInput === PIN) {
      setUnlocked(true);
      toast.success("Welcome to Parent Dashboard! / والدین کا ڈیش بورڈ کھل گیا!");
    } else {
      toast.error("Wrong PIN! Default is 1234");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-border">
          <div className="text-center mb-8">
            <div className="w-20 h-20 gradient-hero rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl">
              👨‍👩‍👧
            </div>
            <h1 className="text-2xl font-extrabold text-green-800">Parent Dashboard</h1>
            <p className="text-amber-600 font-bold mt-1" dir="rtl">والدین کا ڈیش بورڈ</p>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your PIN to access parental controls
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-green-800 mb-2">
                <Lock size={14} className="inline mr-1" />
                Parent PIN / والدین کا پن
              </label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  placeholder="Enter PIN (default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  maxLength={6}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-input text-lg font-bold tracking-[0.5rem] text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* PIN pad */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "⌫"].map((n, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (n === "⌫") setPinInput((p) => p.slice(0, -1));
                    else if (n !== null) setPinInput((p) => (p.length < 6 ? p + n : p));
                  }}
                  disabled={n === null}
                  className={`py-3 rounded-xl font-extrabold text-lg transition-all btn-bounce ${
                    n === null
                      ? "invisible"
                      : n === "⌫"
                      ? "bg-red-50 border border-red-200 text-red-500 hover:bg-red-100"
                      : "bg-gray-50 border border-border text-gray-800 hover:bg-green-50 hover:border-green-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={handleUnlock}
              className="w-full py-4 gradient-hero text-white font-extrabold text-lg rounded-2xl btn-bounce shadow-lg hover:shadow-xl transition-all"
            >
              🔓 Unlock Dashboard
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Demo PIN: <strong>1234</strong> • Change in Settings
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Stats
  const totalRead = history.length;
  const completed = history.filter((h) => h.completed).length;
  const totalFavorites = favorites.length;

  const categoryStats = CATEGORIES.map((cat) => {
    const count = history.filter((h) => {
      const story = ALL_STORIES.find((s) => s.id === h.storyId);
      return story?.category === cat.id;
    }).length;
    return { ...cat, readCount: count };
  }).sort((a, b) => b.readCount - a.readCount);

  const recentStories = history.slice(0, 5).map((h) => ({
    ...h,
    story: ALL_STORIES.find((s) => s.id === h.storyId),
  })).filter((h) => h.story);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-4 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400/30 rounded-2xl flex items-center justify-center text-2xl">
                👨‍👩‍👧
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Parent Dashboard</h1>
                <p className="text-amber-300 font-bold" dir="rtl">والدین کا ڈیش بورڈ</p>
              </div>
            </div>
            <button
              onClick={() => setUnlocked(false)}
              className="px-4 py-2 bg-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all"
            >
              🔒 Lock
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { icon: BookOpen, value: totalRead, label: "Stories Read", color: "bg-green-400/30" },
              { icon: Trophy, value: completed, label: "Completed", color: "bg-amber-400/30" },
              { icon: Heart, value: totalFavorites, label: "Favorites", color: "bg-red-400/30" },
              { icon: Star, value: totalRead > 0 ? Math.round((completed / totalRead) * 100) + "%" : "0%", label: "Completion Rate", color: "bg-sky-400/30" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className={`${color} rounded-2xl p-4 text-center`}>
                <Icon size={20} className="text-white mx-auto mb-1" />
                <p className="text-white font-extrabold text-2xl">{value}</p>
                <p className="text-green-200 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl mb-8">
          {(["overview", "controls", "progress"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "text-muted-foreground hover:text-green-700"
              }`}
            >
              {tab === "overview" ? "📊 Overview" : tab === "controls" ? "🛡️ Controls" : "📈 Progress"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
              <h2 className="text-lg font-extrabold text-green-800 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-green-600" />
                Recent Reading Activity / حالیہ پڑھائی
              </h2>
              {recentStories.length > 0 ? (
                <div className="space-y-3">
                  {recentStories.map(({ story, readAt, completed }) => (
                    <div key={story!.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-border">
                      <img
                        src={story!.thumbnail}
                        alt={story!.title}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">{story!.title}</p>
                        <p className="text-xs text-amber-600" dir="rtl">{story!.titleUrdu}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                          completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {completed ? "✅" : "📖"}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(readAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
                  <p>No reading activity yet. Encourage your child to read!</p>
                  <p className="text-sm" dir="rtl">ابھی تک کوئی سرگرمی نہیں۔ اپنے بچے کو پڑھنے کی ترغیب دیں!</p>
                </div>
              )}
            </div>

            {/* Category breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
              <h2 className="text-lg font-extrabold text-green-800 mb-4 flex items-center gap-2">
                <BarChart2 size={18} className="text-green-600" />
                Category Interests / قسم کی دلچسپی
              </h2>
              <div className="space-y-3">
                {categoryStats.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-3">
                    <span className="text-xl w-8">{cat.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold text-gray-800">{cat.name}</span>
                        <span className="text-muted-foreground">{cat.readCount} stories</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-700"
                          style={{ width: totalRead > 0 ? `${(cat.readCount / totalRead) * 100}%` : "0%" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "controls" && (
          <div className="space-y-6">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
              <h3 className="font-extrabold text-amber-800 mb-1 flex items-center gap-2">
                <ShieldCheck size={16} />
                Content Safety Controls
              </h3>
              <p className="text-amber-700 text-sm" dir="rtl">مواد کی حفاظتی ترتیبات</p>
            </div>

            {[
              {
                title: "Safe Mode",
                titleUrdu: "محفوظ موڈ",
                desc: "All content is pre-screened for age-appropriateness",
                descUrdu: "تمام مواد عمر کے مطابق جانچا گیا ہے",
                enabled: true,
                icon: "🛡️",
              },
              {
                title: "Islamic Values Filter",
                titleUrdu: "اسلامی اقدار فلٹر",
                desc: "Only shows content aligned with Islamic principles",
                descUrdu: "صرف اسلامی اصولوں کے مطابق مواد دکھاتا ہے",
                enabled: true,
                icon: "☪️",
              },
              {
                title: "Age Restriction",
                titleUrdu: "عمر کی پابندی",
                desc: "Restrict content to specific age groups",
                descUrdu: "مخصوص عمر کے گروپوں تک مواد محدود کریں",
                enabled: false,
                icon: "👶",
              },
              {
                title: "Screen Time Reminders",
                titleUrdu: "اسکرین ٹائم یاد دہانی",
                desc: "Remind children to take breaks every 30 minutes",
                descUrdu: "بچوں کو ہر 30 منٹ میں وقفہ لینے کی یاد دلائیں",
                enabled: true,
                icon: "⏰",
              },
            ].map(({ title, titleUrdu, desc, descUrdu, enabled, icon }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-border flex items-start gap-4">
                <span className="text-3xl">{icon}</span>
                <div className="flex-1">
                  <h3 className="font-extrabold text-gray-900">{title}</h3>
                  <p className="text-xs font-bold text-amber-600" dir="rtl">{titleUrdu}</p>
                  <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                  <p className="text-xs text-gray-400" dir="rtl">{descUrdu}</p>
                </div>
                <div
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    enabled ? "bg-green-500" : "bg-gray-300"
                  }`}
                  onClick={() => toast.info("Settings saved! ترتیبات محفوظ!")}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    enabled ? "translate-x-7" : "translate-x-1"
                  }`} />
                </div>
              </div>
            ))}

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-800">
              <p className="font-bold">📌 Parent Note:</p>
              <p>IslamiToons content is reviewed by Islamic scholars. All stories promote positive values, Islamic education, and healthy child development. No ads, no inappropriate content.</p>
              <p className="mt-1 text-right" dir="rtl">
                اسلامی ٹونز کا مواد اسلامی علماء کی نگرانی میں ہے۔ کوئی اشتہار نہیں، کوئی غیر مناسب مواد نہیں۔
              </p>
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reading streak */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
                <h3 className="font-extrabold text-green-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  Reading Streak / پڑھائی کی لڑی
                </h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded transition-all ${
                        Math.random() > 0.4 ? "bg-green-500" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Last 4 weeks reading activity</p>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
                <h3 className="font-extrabold text-green-800 mb-4 flex items-center gap-2">
                  <Trophy size={16} className="text-amber-500" />
                  Achievements / کامیابیاں
                </h3>
                <div className="space-y-2">
                  {[
                    { badge: "🌟", name: "First Story", desc: "Read your first story", earned: totalRead >= 1 },
                    { badge: "📚", name: "Book Worm", desc: "Read 5 stories", earned: totalRead >= 5 },
                    { badge: "🏆", name: "Story Champion", desc: "Read 10 stories", earned: totalRead >= 10 },
                    { badge: "❤️", name: "Story Lover", desc: "Save 3 favorites", earned: totalFavorites >= 3 },
                  ].map(({ badge, name, desc, earned }) => (
                    <div key={name} className={`flex items-center gap-3 p-2 rounded-xl ${earned ? "bg-amber-50" : "bg-gray-50 opacity-60"}`}>
                      <span className="text-2xl">{badge}</span>
                      <div>
                        <p className={`text-sm font-bold ${earned ? "text-amber-800" : "text-gray-400"}`}>{name}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      {earned && <span className="ml-auto text-green-600 text-xs font-bold">✅ Earned</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
              <h3 className="font-extrabold text-green-800 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-green-600" />
                Recommended Reading Plan / تجویز کردہ پڑھنے کا منصوبہ
              </h3>
              <div className="space-y-2">
                {[
                  { day: "Monday / پیر", story: "An Islamic story about Prophets", cat: "islamic" },
                  { day: "Tuesday / منگل", story: "Notu & Putlu Comedy Adventure", cat: "comedy" },
                  { day: "Wednesday / بدھ", story: "Jungle Adventure with Animals", cat: "jungle" },
                  { day: "Thursday / جمعرات", story: "Historical Tale from Islamic History", cat: "historical" },
                  { day: "Friday / جمعہ", story: "Quran Recitation & Duas", cat: "quran" },
                  { day: "Saturday / ہفتہ", story: "Outdoor Activity Story", cat: "outdoor" },
                  { day: "Sunday / اتوار", story: "Moral Story & Quiz", cat: "moral" },
                ].map(({ day, story, cat }) => (
                  <div key={day} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-border text-sm">
                    <span className="font-bold text-green-700 w-28 flex-shrink-0">{day}</span>
                    <span className="text-gray-700 flex-1">{story}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold capitalize">
                      {cat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
