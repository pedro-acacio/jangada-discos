import { Disc3, Plus, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatBRL, installmentPrice, pixPrice } from "../lib/pricing";

export default function ProductCard({ product, onBuyNow }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const outOfStock = product.stock <= 0;
  const favorited = isFavorite(product.id);

  return (
    <div className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-sun/50 transition-colors flex flex-col">
      <div
        className={`relative aspect-square bg-gradient-to-br ${product.hue} flex items-center justify-center`}
      >
        <Disc3 className="w-16 h-16 text-white/80 group-hover:rotate-45 transition-transform duration-500" />

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${favorited ? "fill-coral text-coral" : "text-white"}`}
          />
        </button>

        {product.stock === 1 && !outOfStock && (
          <span className="absolute top-2 left-2 bg-magenta text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">
            Última unidade
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full">
            Esgotado
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-sun font-semibold uppercase tracking-wide">
          {product.category} · {product.year}
        </p>
        <h3 className="mt-1 font-display font-700 leading-snug">{product.title}</h3>
        <p className="text-sm text-sand/70">{product.artist}</p>
        <p className="text-xs text-sand/50 mt-1">{product.condition}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-display font-700 text-lg">
              {formatBRL(product.price)}
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              {formatBRL(pixPrice(product.price))} no Pix
            </span>
          </div>
          <p className="text-[11px] text-sand/40 mt-0.5">
            12x de {formatBRL(installmentPrice(product.price))} sem juros
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              disabled={outOfStock}
              onClick={() => onBuyNow(product)}
              className="flex-1 bg-coral disabled:bg-white/10 disabled:text-sand/40 hover:bg-coral/90 transition-colors text-white text-sm font-semibold px-3 py-2 rounded-full"
            >
              {outOfStock ? "Indisponível" : "Comprar"}
            </button>
            <button
              disabled={outOfStock}
              onClick={() => addItem(product)}
              aria-label="Adicionar ao carrinho"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
