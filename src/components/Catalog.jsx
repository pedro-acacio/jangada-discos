import { useMemo, useState } from "react";
import { Search, Heart } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Catalog({ onBuyNow }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { ids: favoriteIds } = useFavorites();

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        `${p.title} ${p.artist}`.toLowerCase().includes(query.toLowerCase());
      const matchesFavorites = !onlyFavorites || favoriteIds.includes(p.id);
      return matchesCategory && matchesQuery && matchesFavorites;
    });
  }, [category, query, onlyFavorites, favoriteIds]);

  return (
    <section id="catalogo" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display font-800 text-3xl">Catálogo</h2>
          <p className="text-sand/60 mt-1 text-sm">
            Acervo de exemplo — substitua pelos discos reais da loja.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artista ou álbum"
            className="w-full bg-white/5 border border-white/10 focus:border-sun outline-none rounded-full pl-9 pr-4 py-2 text-sm placeholder:text-sand/40"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === c
                ? "bg-sun text-night border-sun"
                : "border-white/15 text-sand/70 hover:border-sun/60"
            }`}
          >
            {c}
          </button>
        ))}

        <button
          onClick={() => setOnlyFavorites((v) => !v)}
          className={`ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            onlyFavorites
              ? "bg-coral text-white border-coral"
              : "border-white/15 text-sand/70 hover:border-coral/60"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? "fill-white" : ""}`} />
          Favoritos
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sand/50 text-sm">
          {onlyFavorites
            ? "Você ainda não favoritou nenhum disco."
            : "Nenhum disco encontrado."}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onBuyNow={onBuyNow} />
          ))}
        </div>
      )}
    </section>
  );
}
