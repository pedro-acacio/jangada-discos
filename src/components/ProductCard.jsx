import { Disc3, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <div className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-sun/50 transition-colors flex flex-col">
      <div
        className={`relative aspect-square bg-gradient-to-br ${product.hue} flex items-center justify-center`}
      >
        <Disc3 className="w-16 h-16 text-white/80 group-hover:rotate-45 transition-transform duration-500" />
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

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-display font-700 text-lg">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            disabled={outOfStock}
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-1 bg-coral disabled:bg-white/10 disabled:text-sand/40 hover:bg-coral/90 transition-colors text-white text-sm font-semibold px-3 py-2 rounded-full"
          >
            <Plus className="w-4 h-4" />
            {outOfStock ? "Indisponível" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
