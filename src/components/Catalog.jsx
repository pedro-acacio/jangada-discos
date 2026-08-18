import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "./ProductCard";

export default function Catalog() {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        `${p.title} ${p.artist}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

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

      <div className="flex flex-wrap gap-2 mb-8">
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
      </div>

      {filtered.length === 0 ? (
        <p className="text-sand/50 text-sm">Nenhum disco encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
