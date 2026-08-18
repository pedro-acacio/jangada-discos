import { MessageCircle } from "lucide-react";

export default function ContactButton() {
  return (
    <a
      href="https://ig.me/m/jangadadiscos"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 transition-colors text-night font-semibold text-sm px-4 py-3 rounded-full shadow-vinyl"
      aria-label="Falar com a Jangada Discos no Instagram"
    >
      <MessageCircle className="w-5 h-5" />
      Fale com a loja
    </a>
  );
}
