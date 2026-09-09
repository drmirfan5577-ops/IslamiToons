import { useState, useEffect, useRef, useCallback } from "react";

export type TTSLanguage = "ur-PK" | "en-US" | "ar-SA";

interface UseTextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const { rate = 0.85, pitch = 1.1, volume = 1 } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setIsSupported("speechSynthesis" in window);

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const getBestVoice = useCallback(
    (lang: TTSLanguage): SpeechSynthesisVoice | null => {
      const langMap: Record<TTSLanguage, string[]> = {
        "ur-PK": ["ur", "ur-PK", "hi", "hi-IN"],
        "en-US": ["en-US", "en-GB", "en"],
        "ar-SA": ["ar-SA", "ar"],
      };
      const prefixes = langMap[lang] || ["en"];
      for (const prefix of prefixes) {
        const match = voices.find((v) => v.lang.startsWith(prefix));
        if (match) return match;
      }
      return voices[0] || null;
    },
    [voices]
  );

  const speak = useCallback(
    (text: string, lang: TTSLanguage = "ur-PK") => {
      if (!isSupported) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      const voice = getBestVoice(lang);
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, rate, pitch, volume, getBestVoice]
  );

  const pause = useCallback(() => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isPlaying, isPaused]);

  const resume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const toggle = useCallback(
    (text: string, lang: TTSLanguage = "ur-PK") => {
      if (isPlaying && !isPaused) {
        pause();
      } else if (isPaused) {
        resume();
      } else {
        speak(text, lang);
      }
    },
    [isPlaying, isPaused, pause, resume, speak]
  );

  return {
    isPlaying,
    isPaused,
    isSupported,
    speak,
    pause,
    resume,
    stop,
    toggle,
    voices,
  };
}
