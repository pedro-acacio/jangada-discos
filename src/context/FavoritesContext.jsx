import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "jangada_favorites";

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  function toggleFavorite(id) {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return ids.includes(id);
  }

  return (
    <FavoritesContext.Provider value={{ ids, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
