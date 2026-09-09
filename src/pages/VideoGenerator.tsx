import { useState } from "react";
import {
  Sparkles, Video, Play, Download, Wand2, Zap, Film, Settings2,
  Star, Clock, MonitorPlay, ChevronRight, Palette, Music, Mountain,
  Layers, Eye, RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const STYLES = [
  { id: "islamic-cartoon", label: "Islamic Cartoon", labelUrdu: "اسلامی کارٹون", emoji: "🕌", desc: "Colorful 3D Islamic themed animation" },
  { id: "jungle-3d", label: "Jungle 3D", labelUrdu: "جنگل 3D", emoji: "🌿", desc: "Lush 3D jungle world with animals" },
  { id: "historical", label: "Historical Epic", labelUrdu: "تاریخی", emoji: "📜", desc: "Cinematic ancient Islamic civilization" },
  { id: "notu-putlu", label: "Notu-Putlu Style", labelUrdu: "نوتو پتلو اسٹائل", emoji: "👦", desc: "Fun Pakistani cartoon style characters" },
  { id: "nature-doc", label: "Nature Documentary", labelUrdu: "فطرتی دستاویز", emoji: "🦁", desc: "Ultra-realistic 4K nature scenes" },
  { id: "fantasy", label: "Fantasy Islamic", labelUrdu: "فینٹیسی اسلامی", emoji: "✨", desc: "Magical worlds with Islamic elements" },
];

const RESOLUTIONS = [
  { id: "hd", label: "HD 720p", badge: "Standard", color: "bg-gray-100 text-gray-700 border-gray-300" },
  { id: "fullhd", label: "Full HD 1080p", badge: "Ultra HD", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { id: "4k", label: "4K 2160p", badge: "Ultra HD+", color: "bg-purple-100 text-purple-700 border-purple-300" },
  { id: "8k", label: "8K Ultra", badge: "Pro", color: "bg-amber-100 text-amber-700 border-amber-300" },
];

const DURATIONS = [
  { value: "30s", label: "30 seconds", icon: "⚡" },
  { value: "1min", label: "1 minute", icon: "🎬" },
  { value: "5min", label: "5 minutes", icon: "📽️" },
  { value: "10min", label: "10 minutes", icon: "🎥" },
];

const PRESETS = [
  { id: "p1", title: "Notu & Putlu Eid Adventure", prompt: "Notu and Putlu celebrate Eid with their family, funny moments, Islamic greetings, and sharing gifts", style: "notu-putlu", duration: "5min", emoji: "🎉" },
  { id: "p2", title: "Prophet Ibrahim's Star Story", prompt: "Ibrahim AS looks at the stars and moon searching for truth, beautiful sky animation, Islamic narration", style: "historical", duration: "5min", emoji: "⭐" },
  { id: "p3", title: "Leo's Jungle Kingdom", prompt: "Leo the Lion holds court in his jungle kingdom, animals present cases, justice served with wisdom", style: "jungle-3d", duration: "5min", emoji: "🦁" },
  { id: "p4", title: "The Wonder Garden", prompt: "Children plant seeds in garden, time lapse growth, learning Allah's creation, outdoor activity fun", style: "nature-doc", duration: "3min", emoji: "🌱" },
];

type GenerationStage = "idle" | "analyzing" | "rendering" | "composing" | "finalizing" | "done";

const STAGES: { stage: GenerationStage; label: string; labelUrdu: string; duration: number }[] = [
  { stage: "analyzing", label: "Analyzing your prompt...", labelUrdu: "پرامپٹ کا تجزیہ...", duration: 1500 },
  { stage: "rendering", label: "Rendering 3D scenes...", labelUrdu: "3D مناظر تیار ہو رہے ہیں...", duration: 3000 },
  { stage: "composing", label: "Composing animation frames...", labelUrdu: "اینیمیشن فریم بن رہے ہیں...", duration: 2500 },
  { stage: "finalizing", label: "Adding audio & effects...", labelUrdu: "آڈیو اور اثرات شامل ہو رہے ہیں...", duration: 2000 },
  { stage: "done", label: "Video ready!", labelUrdu: "ویڈیو تیار!", duration: 0 },
];

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("islamic-cartoon");
  const [selectedRes, setSelectedRes] = useState("fullhd");
  const [selectedDuration, setSelectedDuration] = useState("5min");
  const [stage, setStage] = useState<GenerationStage>("idle");
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState("");
  const [stageLabelUrdu, setStageLabelUrdu] = useState("");
  const [generated, setGenerated] = useState(false);

  const currentStyle = STYLES.find((s) => s.id === selectedStyle)!;
  const currentRes = RESOLUTIONS.find((r) => r.id === selectedRes)!;

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt! آئیڈیا یا پرامپٹ لکھیں!");
      return;
    }

    setGenerated(false);
    setStage("analyzing");
    setProgress(0);

    let totalProgress = 0;
    STAGES.forEach((s, i) => {
      if (s.stage === "done") {
        setTimeout(() => {
          setStage("done");
          setProgress(100);
          setStageLabel("🎉 Video ready!");
          setStageLabelUrdu("ویڈیو تیار!");
          setGenerated(true);
          toast.success("🎬 Your video is ready! آپ کی ویڈیو تیار ہے!");
        }, totalProgress);
        return;
      }
      setTimeout(() => {
        setStage(s.stage);
        setStageLabel(s.label);
        setStageLabelUrdu(s.labelUrdu);
      }, totalProgress);
      totalProgress += s.duration;
      const steps = 10;
      for (let step = 1; step <= steps; step++) {
        const p = Math.round(((i * 100) / (STAGES.length - 1)) + (step / steps) * (100 / (STAGES.length - 1)));
        setTimeout(() => setProgress(Math.min(p, 99)), totalProgress - s.duration + (s.duration / steps) * step);
      }
    });
  };

  const isGenerating = ["analyzing", "rendering", "composing", "finalizing"].includes(stage);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="gradient-hero pattern-stars py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-8 right-20 text-5xl opacity-20 floating">🎬</div>
        <div className="absolute bottom-8 left-16 text-4xl opacity-20 star-spin">✨</div>
        <div className="relative z-10">
          <div className="text-6xl mb-4 floating">🎥</div>
          <h1 className="text-4xl font-extrabold text-white mb-2">AI Video Generator</h1>
          <p className="text-3xl font-bold text-amber-300 mb-2" dir="rtl">اے آئی ویڈیو جنریٹر</p>
          <p className="text-green-200 max-w-2xl mx-auto text-sm">
            Transform any idea, text, or story prompt into stunning 3D/4D Islamic cartoon videos in HD, Ultra HD, and 8K quality — completely exportable!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {["🎬 3D / 4D Animation", "📺 Up to 8K Ultra HD", "⬇️ Exportable", "🕌 Islamic Theme", "👦 Cartoon Style"].map((tag) => (
              <span key={tag} className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Quick Presets */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h2 className="text-base font-extrabold text-amber-800 mb-3">
            ⚡ Quick Start Presets / فوری شروعات
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setPrompt(preset.prompt);
                  setSelectedStyle(preset.style);
                  setSelectedDuration(preset.duration);
                  toast.success("Preset loaded! پریسیٹ لوڈ ہوا!");
                }}
                className="flex items-start gap-3 p-3 bg-white rounded-xl border border-amber-200 text-left hover:border-amber-400 transition-all btn-bounce group"
              >
                <span className="text-2xl">{preset.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate group-hover:text-amber-700">
                    {preset.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{preset.prompt}</p>
                </div>
                <ChevronRight size={14} className="text-amber-400 flex-shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>

        {/* STEP 1: Prompt */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1 flex items-center gap-2">
            <Wand2 size={18} className="text-amber-500" />
            Step 1: Your Idea / آئیڈیا
          </h2>
          <p className="text-amber-600 text-sm font-bold mb-4" dir="rtl">اپنا خیال یا کہانی لکھیں</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your video idea, story, or prompt...
مثال: نوتو اور پتلو عید پر پتنگ اڑاتے ہیں اور ایک خاص مہم جوئی پر نکلتے ہیں..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none leading-relaxed"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{prompt.length}/500 characters</span>
            <button
              onClick={() => setPrompt("")}
              className="text-red-400 hover:text-red-600 flex items-center gap-1"
            >
              <RotateCcw size={10} /> Clear
            </button>
          </div>
        </div>

        {/* STEP 2: Style */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1 flex items-center gap-2">
            <Palette size={18} className="text-purple-500" />
            Step 2: Video Style / ویڈیو اسٹائل
          </h2>
          <p className="text-amber-600 text-sm font-bold mb-4" dir="rtl">ویڈیو کا انداز منتخب کریں</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all btn-bounce ${
                  selectedStyle === style.id
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-border hover:border-green-200"
                }`}
              >
                <span className="text-3xl mb-2 block">{style.emoji}</span>
                <p className="font-extrabold text-sm text-gray-900">{style.label}</p>
                <p className="text-xs text-amber-600 font-bold" dir="rtl">{style.labelUrdu}</p>
                <p className="text-xs text-muted-foreground mt-1">{style.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3: Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-border">
          <h2 className="text-xl font-extrabold text-green-800 mb-1 flex items-center gap-2">
            <Settings2 size={18} className="text-sky-500" />
            Step 3: Quality & Duration / معیار اور دورانیہ
          </h2>
          <p className="text-amber-600 text-sm font-bold mb-4" dir="rtl">ریزولیوشن اور لمبائی</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resolution */}
            <div>
              <label className="block text-sm font-bold text-green-800 mb-3">
                <MonitorPlay size={14} className="inline mr-1" />
                Resolution / ریزولیوشن
              </label>
              <div className="space-y-2">
                {RESOLUTIONS.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => setSelectedRes(res.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all btn-bounce ${
                      selectedRes === res.id
                        ? "border-green-500 bg-green-50"
                        : "border-border hover:border-green-200"
                    }`}
                  >
                    <span className="font-bold text-sm">{res.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${res.color}`}>
                      {res.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-green-800 mb-3">
                <Clock size={14} className="inline mr-1" />
                Duration / دورانیہ
              </label>
              <div className="space-y-2">
                {DURATIONS.map((dur) => (
                  <button
                    key={dur.value}
                    onClick={() => setSelectedDuration(dur.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all btn-bounce ${
                      selectedDuration === dur.value
                        ? "border-green-500 bg-green-50"
                        : "border-border hover:border-green-200"
                    }`}
                  >
                    <span className="text-xl">{dur.icon}</span>
                    <span className="font-bold text-sm">{dur.label}</span>
                    {dur.value === "10min" && (
                      <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                        MAX
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Music, label: "Background Music", enabled: true },
              { icon: Layers, label: "3D Depth Effects", enabled: true },
              { icon: Zap, label: "HDR Lighting", enabled: true },
              { icon: Film, label: "Smooth Transitions", enabled: true },
            ].map(({ icon: Icon, label, enabled }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center text-xs font-bold ${
                  enabled ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-border text-gray-400"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {enabled && <span className="text-green-500 text-xs">✅</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Generation Progress */}
        {(isGenerating || generated) && (
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-green-200 slide-in">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                generated ? "bg-green-100" : "bg-amber-100"
              }`}>
                {generated ? "✅" : <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />}
              </div>
              <div>
                <p className="font-extrabold text-gray-900">{stageLabel}</p>
                <p className="text-sm text-amber-600 font-bold" dir="rtl">{stageLabelUrdu}</p>
              </div>
              <span className="ml-auto text-2xl font-extrabold text-green-700">{progress}%</span>
            </div>

            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {generated && (
              <div className="mt-6 space-y-4 slide-in">
                {/* Video Preview Placeholder */}
                <div className="bg-gray-900 rounded-2xl aspect-video flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 via-emerald-800/30 to-amber-900/50" />
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-3">{currentStyle.emoji}</div>
                    <p className="text-white font-extrabold text-lg">{currentStyle.label} Video</p>
                    <p className="text-amber-300 font-bold text-sm" dir="rtl">{currentStyle.labelUrdu} ویڈیو</p>
                    <p className="text-gray-400 text-xs mt-2">{currentRes.label} • {selectedDuration}</p>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 group-hover:bg-white/30 transition-all">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </button>
                </div>

                {/* Video Info */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Style", value: currentStyle.label },
                    { label: "Resolution", value: currentRes.label },
                    { label: "Duration", value: selectedDuration },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-green-50 rounded-xl p-3 border border-green-200">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-bold text-green-800 text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => toast.success("⬇️ Downloading video... ویڈیو ڈاؤنلوڈ ہو رہی ہے!")}
                    className="flex items-center justify-center gap-2 py-3 gradient-hero text-white rounded-xl font-bold hover:opacity-90 transition-all btn-bounce"
                  >
                    <Download size={16} />
                    Download {currentRes.label}
                  </button>
                  <button
                    onClick={() => toast.info("📤 Sharing... شیئر ہو رہا ہے!")}
                    className="flex items-center justify-center gap-2 py-3 bg-amber-50 border-2 border-amber-300 text-amber-700 rounded-xl font-bold hover:border-amber-500 transition-all btn-bounce"
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                  <button
                    onClick={() => {
                      setGenerated(false);
                      setStage("idle");
                      setProgress(0);
                    }}
                    className="flex items-center justify-center gap-2 py-3 bg-gray-100 border border-border text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all btn-bounce"
                  >
                    <RotateCcw size={16} />
                    New Video
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generate Button */}
        {!isGenerating && !generated && (
          <button
            onClick={handleGenerate}
            className="w-full py-6 gradient-gold text-white font-extrabold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all btn-bounce pulse-ring flex items-center justify-center gap-3"
          >
            <Video size={24} />
            ✨ Generate Video! ویڈیو بنائیں!
            <Sparkles size={24} />
          </button>
        )}

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
          <strong>📌 Note:</strong> This AI Video Generator creates educational Islamic cartoon videos for children. All generated content follows Islamic guidelines and is suitable for ages 3-14. Videos are generated with 3D/4D rendering technology in HD to 8K Ultra HD quality, fully exportable in MP4 format.
          <span className="block mt-1 text-right" dir="rtl">
            یہ اے آئی ویڈیو جنریٹر اسلامی اصولوں کے مطابق بچوں کے لیے تعلیمی کارٹون ویڈیوز بناتا ہے۔
          </span>
        </div>
      </div>
    </div>
  );
}
