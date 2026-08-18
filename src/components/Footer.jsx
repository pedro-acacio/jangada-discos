import JangadaLogo from "./JangadaLogo";

export default function Footer() {
  return (
    <footer id="contato" className="bg-night border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <JangadaLogo className="h-7 w-7" />
          <span className="font-display font-700 text-sm">JANGADA DISCOS</span>
        </div>
        <p className="text-sand/40 text-xs text-center">
          © {new Date().getFullYear()} Jangada Discos · Fortaleza, CE · Enviamos para todo o Brasil
        </p>
      </div>
    </footer>
  );
}
