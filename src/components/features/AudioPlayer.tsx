import { useState } from "react";
import {
  Play, Pause, Square, Volume2, VolumeX, ChevronDown,
} from "lucide-react";
import { useTextToSpeech, type TTSLanguage } from "@/hooks/useTextToSpeech";
import { toast } from "sonner";

interface AudioPlayerProps {
  textUrdu: string;
  textEnglish: string;
  title?: string;
  compact?: boolean;
}

export default function AudioPlayer({
  textUrdu,
  textEnglish,
  title,
  compact = false,
}: AudioPlayerProps) {
  const [lang, setLang] = useState<TTSLanguage>("ur-PK");
  const [showOptions, setShowOptions] = useState(false);
  const { isPlaying, isPaused, isSupported, speak, stop, toggle } = useTextToSpeech({
    rate: lang === "ar-SA" ? 0.75 : 0.85,
    pitch: 1.05,
    volume: 1,
  });

  if (!isSupported) return null;

  const currentText = lang === "ur-PK" ? textUrdu : lang === "ar-SA" ? textUrdu : textEnglish;

  const langOptions: { value: TTSLanguage; label: string; flag: string }[] = [
    { value: "ur-PK", label: "اردو", flag: "🇵🇰" },
    { value: "en-US", label: "English", flag: "🇬🇧" },
    { value: "ar-SA", label: "عربی", flag: "🇸🇦" },
  ];

  const handlePlay = () => {
    if (!currentText.trim()) {
      toast.error("No text to read!");
      return;
    }
    toggle(currentText, lang);
  };

  const selectedLang = langOptions.find((l) => l.value === lang)!;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handlePlay}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all btn-bounce ${
            isPlaying
              ? "bg-sky-100 border-sky-400 text-sky-700"
              : "border-border text-muted-foreground hover:border-sky-300"
          }`}
        >
          {isPlaying && !isPaused ? (
            <Pause size={14} className="text-sky-600" />
          ) : (
            <Play size={14} />
          )}
          {isPlaying && !isPaused ? "Pause" : isPaused ? "Resume" : "Listen"}
        </button>
        {isPlaying && (
          <button
            onClick={stop}
            className="p-2 rounded-xl border border-red-200 text-red-400 hover:border-red-400 transition-all"
          >
            <Square size={12} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center">
            <Volume2 size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-sky-800">Audio Narration</p>
            <p className="text-xs text-sky-600 font-bold" dir="rtl">آڈیو سنانا</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-sky-200 rounded-xl text-sm font-bold text-sky-700 hover:border-sky-400 transition-all"
          >
            {selectedLang.flag} {selectedLang.label}
            <ChevronDown size={12} />
          </button>
          {showOptions && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-sky-200 rounded-xl shadow-xl z-10 overflow-hidden min-w-[120px]">
              {langOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    stop();
                    setLang(opt.value);
                    setShowOptions(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-bold transition-colors ${
                    lang === opt.value
                      ? "bg-sky-50 text-sky-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt.flag} {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Waveform animation */}
      {isPlaying && !isPaused && (
        <div className="flex items-center gap-1 mb-3 justify-center">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-sky-400 rounded-full w-1"
              style={{
                height: `${8 + Math.random() * 16}px`,
                animation: `pulse ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Text preview */}
      <div className="bg-white rounded-xl p-3 mb-3 border border-sky-100">
        <p
          className={`text-sm text-gray-700 leading-relaxed line-clamp-2 ${lang !== "en-US" ? "text-right" : ""}`}
          dir={lang !== "en-US" ? "rtl" : "ltr"}
        >
          {currentText}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all btn-bounce ${
            isPlaying && !isPaused
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : isPaused
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-sky-500 text-white hover:bg-sky-600"
          }`}
        >
          {isPlaying && !isPaused ? (
            <>
              <Pause size={16} />
              Pause / روکیں
            </>
          ) : isPaused ? (
            <>
              <Play size={16} />
              Resume / جاری رکھیں
            </>
          ) : (
            <>
              <Play size={16} />
              Play / سنیں ▶
            </>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={stop}
            className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-all"
          >
            <Square size={16} />
          </button>
        )}

        {!isPlaying && !isPaused && (
          <button
            onClick={() => speak(currentText, lang)}
            className="p-3 rounded-xl bg-white border border-sky-200 text-sky-500 hover:border-sky-400 transition-all"
            title="Read aloud"
          >
            <VolumeX size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
