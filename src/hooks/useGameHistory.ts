"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY_RECENT = "playonhub_recent_games";
const STORAGE_KEY_FAVORITES = "playonhub_favorites";
const MAX_RECENT = 6;

export interface RecentGame {
  slug: string;
  title: string;
  thumbnail: string;
  playedAt: number;
}

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function useRecentGames() {
  const [recent, setRecent] = useState<RecentGame[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRecent(getStorageItem<RecentGame[]>(STORAGE_KEY_RECENT, []));
    setMounted(true);
  }, []);

  const addRecent = useCallback((slug: string, title: string, thumbnail: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((g) => g.slug !== slug);
      const next = [{ slug, title, thumbnail, playedAt: Date.now() }, ...filtered].slice(
        0,
        MAX_RECENT
      );
      setStorageItem(STORAGE_KEY_RECENT, next);
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    setStorageItem(STORAGE_KEY_RECENT, []);
  }, []);

  return { recent, addRecent, clearRecent, mounted };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getStorageItem<string[]>(STORAGE_KEY_FAVORITES, []));
    setMounted(true);
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      setStorageItem(STORAGE_KEY_FAVORITES, next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, mounted };
}
