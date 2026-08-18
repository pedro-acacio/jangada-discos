import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, removeItem, setQty, total } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-dusk z-50 shadow-2xl transition-transform flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="font-display font-700 text-lg">Seu carrinho</h2>
          <button onClick={onClose} className="p-1 hover:text-sun" aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <p className="text-sand/50 text-sm">Seu carrinho está vazio.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div
                className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.hue} shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-sand/60 truncate">{item.artist}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, Math.min(item.qty + 1, item.stock))}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sand/40 hover:text-coral"
                  aria-label="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold">
                  R$ {(item.price * item.qty).toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-sm text-sand/70">
              <span>Subtotal</span>
              <span className="text-sand font-semibold text-base">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-sun hover:bg-sun/90 transition-colors text-night font-bold py-3 rounded-full"
            >
              Fechar pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
