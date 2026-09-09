import { useState, useEffect } from "react";
import type { Story } from "@/types";
import { ALL_STORIES } from "@/data/stories";

const FAVORITES_KEY = "islamitoons_favorites";
const HISTORY_KEY = "islamitoons_history";

export interface HistoryEntry {
  storyId: string;
  readAt: number;
  completed: boolean;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const toggleFavorite = (storyId: string) => {
    setFavorites((prev) =>
      prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId]
    );
  };

  const isFavorite = (storyId: string) => favorites.includes(storyId);

  const addToHistory = (storyId: string, completed = false) => {
    setHistory((prev) => {
      const existing = prev.findIndex((e) => e.storyId === storyId);
      const entry: HistoryEntry = { storyId, readAt: Date.now(), completed };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = entry;
        return updated;
      }
      return [entry, ...prev].slice(0, 50);
    });
  };

  const getFavoriteStories = (): Story[] => {
    return favorites
      .map((id) => ALL_STORIES.find((s) => s.id === id))
      .filter(Boolean) as Story[];
  };

  const clearFavorites = () => setFavorites([]);
  const clearHistory = () => setHistory([]);

  return {
    favorites,
    history,
    toggleFavorite,
    isFavorite,
    addToHistory,
    getFavoriteStories,
    clearFavorites,
    clearHistory,
  };
}
