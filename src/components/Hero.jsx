import { Disc3, Truck, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-gradient-to-b from-dusk via-night to-night"
    >
      <div className="absolute -top-10 right-10 w-64 h-64 rounded-full bg-sun/20 blur-3xl" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-sun text-xs font-semibold mb-4">
            Fortaleza · CE
          </p>
          <h1 className="font-display font-800 text-4xl sm:text-5xl leading-tight">
            Vinyl is <span className="text-coral">forever</span>.
          </h1>
          <p className="mt-5 text-sand/80 text-lg max-w-md">
            LPs lacrados e de época, garimpados com carinho. Compre pela loja
            online e receba em qualquer lugar do Brasil.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#catalogo"
              className="bg-coral hover:bg-coral/90 transition-colors text-white font-semibold px-6 py-3 rounded-full"
            >
              Ver catálogo
            </a>
            <a
              href="#loja-fisica"
              className="border border-sand/30 hover:border-sun hover:text-sun transition-colors px-6 py-3 rounded-full font-semibold"
            >
              Loja física
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm text-sm text-sand/70">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-sun shrink-0" />
              Envio para todo o Brasil
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sun shrink-0" />
              Pagamento seguro
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <div className="absolute inset-0 rounded-full bg-black shadow-vinyl vinyl-spin">
              <div className="absolute inset-6 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-[42%] rounded-full bg-coral flex items-center justify-center">
                <Disc3 className="w-6 h-6 text-night" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
