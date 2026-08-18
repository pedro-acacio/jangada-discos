import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import JangadaLogo from "./JangadaLogo";
import { useCart } from "../context/CartContext";
import { formatBRL, FREE_SHIPPING_THRESHOLD } from "../lib/pricing";

const LINKS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#classificacao", label: "Classificação" },
  { href: "#sobre", label: "Sobre" },
  { href: "#loja-fisica", label: "Loja física" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar({ onOpenCart }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-night/90 backdrop-blur border-b border-white/10">
      <div className="bg-sun text-night text-xs font-semibold text-center py-1.5 px-4">
        📦 Frete grátis para todo o Brasil em compras acima de{" "}
        {formatBRL(FREE_SHIPPING_THRESHOLD)}
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a href="#topo" className="flex items-center gap-2">
          <JangadaLogo />
          <span className="font-display font-800 text-lg tracking-wide">
            JANGADA <span className="text-sun">DISCOS</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-sun transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 text-sm font-medium">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
