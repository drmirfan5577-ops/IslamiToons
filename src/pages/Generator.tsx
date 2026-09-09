import { useState } from "react";
import { Sparkles, Plus, X, Wand2, Info } from "lucide-react";
import { toast } from "sonner";
import GeneratedStoryViewer from "@/components/features/GeneratedStoryViewer";
import { CATEGORIES, SETTINGS, THEMES, CHARACTERS } from "@/constants";
import type { GeneratorFormData, StoryCategory, AgeGroup, Language } from "@/types";

const DEFAULT_FORM: GeneratorFormData = {
  category: "islamic",
  ageGroup: "6-9",
  characters: ["Notu"],
  theme: "friendship",
  setting: "masjid",
  language: "urdu",
  lesson: "kindness",
};

export default function Generator() {
  const [form, setForm] = useState<GeneratorFormData>(DEFAULT_FORM);
  const [customChar, setCustomChar] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const addCharacter = (name: string) => {
    if (!name.trim()) return;
    if (form.characters.includes(name)) return;
    if (form.characters.length >= 4) {
      toast.error("Maximum 4 characters allowed!");
      return;
    }
    setForm((p) => ({ ...p, characters: [...p.characters, name.trim()] }));
    setCustomChar("");
  };

  const removeCharacter = (name: string) => {
    setForm((p) => ({ ...p, characters: p.characters.filter((c) => c !== name) }));
  };

  const handleGenerate = () => {
    if (form.characters.length === 0) {
      toast.error("Please add at least one character! کم از کم ایک کردار شامل کریں!");
      return;
    }
    setLoading(true);
    toast.info("✨ Generating your story... کہانی بن رہی ہے!");
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      toast.success("🎉 Story created! کہانی تیار ہے!");
    }, 2000);
  };

  const handleReset = () => {
    setGenerated(false);
    setForm(DEFAULT_FORM);
  };

  if (generated) {
    return (
      <div className="min-h-screen">
        <div className="gradient-hero py-8 px-4 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-1">✨ Your Story is Ready!</h1>
          <p className="text-amber-300 text-xl font-bold" dir="rtl">آپ کی کہانی تیار ہے!</p>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <GeneratedStoryViewer formData={form} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero pattern-stars py-12 px-4 text-center">
        <div className="text-5xl mb-4 floating">✨</div>
        <h1 className="text-4xl font-extrabold text-white mb-2">Story Generator</h1>
        <p className="text-2xl font-bold text-amber-300" dir="rtl">کہانی جنریٹر</p>
        <p className="text-green-200 mt-2 max-w-xl mx-auto">
          Create a unique, personalized Islamic story for your child in seconds!
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <Info size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-700">
            <strong>How it works:</strong> Fill in the form below and click "Generate Story" to create a unique, educational story tailored for your child. All stories include Islamic values and positive lessons.
            <span className="block mt-1 text-right text-amber-600" dir="rtl">
              نیچے فارم بھریں اور "کہانی بنائیں" پر کلک کریں۔
            </span>
          </div>
        </div>

        {/* STEP 1: Category */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1">
            Step 1: Choose Story Type
          </h2>
          <p className="text-amber-600 font-bold mb-4 text-sm" dir="rtl">مرحلہ 1: کہانی کی قسم منتخب کریں</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setForm((p) => ({ ...p, category: cat.id as StoryCategory }))}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-sm font-bold transition-all btn-bounce ${
                  form.category === cat.id
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-border hover:border-green-200"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs">{cat.name}</span>
                <span className="text-xs text-muted-foreground" dir="rtl">{cat.nameUrdu}</span>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: Characters */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1">
            Step 2: Choose Characters
          </h2>
          <p className="text-amber-600 font-bold mb-4 text-sm" dir="rtl">مرحلہ 2: کردار منتخب کریں</p>

          {/* Quick pick preset characters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => addCharacter(char.name)}
                disabled={form.characters.includes(char.name)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-sm font-bold transition-all btn-bounce ${
                  form.characters.includes(char.name)
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-border hover:border-green-200 text-muted-foreground"
                }`}
              >
                <span>{char.emoji}</span>
                <span>{char.name}</span>
              </button>
            ))}
          </div>

          {/* Custom name input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add custom name... اپنا نام لکھیں"
              value={customChar}
              onChange={(e) => setCustomChar(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCharacter(customChar)}
              className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => addCharacter(customChar)}
              className="px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all btn-bounce"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Selected characters */}
          {form.characters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.characters.map((c) => (
                <div key={c} className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-xl font-bold text-sm">
                  <span>{c}</span>
                  <button onClick={() => removeCharacter(c)} className="hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* STEP 3: Theme & Setting */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1">
            Step 3: Theme & Setting
          </h2>
          <p className="text-amber-600 font-bold mb-4 text-sm" dir="rtl">مرحلہ 3: موضوع اور مقام</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-green-800 mb-2">
                📚 Story Theme / موضوع
              </label>
              <select
                value={form.theme}
                onChange={(e) => setForm((p) => ({ ...p, theme: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {THEMES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-green-800 mb-2">
                🗺️ Story Setting / مقام
              </label>
              <select
                value={form.setting}
                onChange={(e) => setForm((p) => ({ ...p, setting: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {SETTINGS.map((s) => (
                  <option key={s.value} value={s.value}>{s.emoji} {s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* STEP 4: Age & Language */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1">
            Step 4: Age Group & Language
          </h2>
          <p className="text-amber-600 font-bold mb-4 text-sm" dir="rtl">مرحلہ 4: عمر اور زبان</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-green-800 mb-2">👶 Age Group / عمر</label>
              <div className="flex gap-2">
                {(["3-5", "6-9", "10-14"] as AgeGroup[]).map((age) => (
                  <button
                    key={age}
                    onClick={() => setForm((p) => ({ ...p, ageGroup: age }))}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-all btn-bounce ${
                      form.ageGroup === age
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-border hover:border-green-200"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-green-800 mb-2">🌍 Language / زبان</label>
              <div className="flex gap-2">
                {(["urdu", "english", "arabic"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setForm((p) => ({ ...p, language: lang }))}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold capitalize transition-all btn-bounce ${
                      form.language === lang
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-border hover:border-green-200"
                    }`}
                  >
                    {lang === "urdu" ? "اردو" : lang === "arabic" ? "عربی" : "English"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-6 gradient-gold text-white font-extrabold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all btn-bounce pulse-ring disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating... کہانی بن رہی ہے</span>
            </>
          ) : (
            <>
              <Wand2 size={24} />
              <span>✨ Generate Story! کہانی بنائیں!</span>
              <Sparkles size={24} />
            </>
          )}
        </button>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
          <strong>📌 Note:</strong> All generated stories are fictional and designed for educational purposes. Stories incorporate Islamic values and are reviewed for age-appropriateness. Generated content is intended to be a starting point — parents are encouraged to read with their children.
          <span className="block mt-1 text-right text-blue-600" dir="rtl">
            تمام تخلیق کردہ کہانیاں تعلیمی مقاصد کے لیے فرضی ہیں اور اسلامی اقدار پر مبنی ہیں۔
          </span>
        </div>
      </div>
    </div>
  );
}
