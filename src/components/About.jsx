import { MapPin } from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function About() {
  return (
    <section id="sobre" className="bg-dusk/40 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display font-800 text-3xl mb-4">Sobre a Jangada</h2>
          <p className="text-sand/70 leading-relaxed">
            LPs lacrados e de época, garimpados com carinho — do relançamento
            novo em folha à raridade que já rodou muito no toca-discos. Vinyl
            is forever.
          </p>
          <a
            href="https://www.instagram.com/jangadadiscos"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sun hover:underline text-sm font-semibold"
          >
            <InstagramIcon className="w-4 h-4" />
            @jangadadiscos
          </a>
        </div>

        <div id="loja-fisica">
          <h3 className="font-display font-700 text-xl mb-4">Loja física</h3>
          <div className="flex items-start gap-3 text-sand/70">
            <MapPin className="w-5 h-5 text-sun shrink-0 mt-0.5" />
            <p>
              Rua Juvenal Galeno, 322 — Benfica
              <br />
              Fortaleza — CE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
