import { GRADES } from "../data/grading";

export default function GradingGuide() {
  return (
    <section id="classificacao" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <h2 className="font-display font-800 text-3xl mb-2">Classificação dos discos</h2>
      <p className="text-sand/60 text-sm max-w-xl mb-8">
        Usamos a escala de classificação padrão do mercado de vinil pra
        descrever o estado de conservação de cada disco de época — assim você
        sabe exatamente o que está comprando.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {GRADES.map((g) => (
          <div
            key={g.code}
            className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <span className="shrink-0 w-14 h-10 flex items-center justify-center rounded-lg bg-sun/15 text-sun font-display font-700 text-sm">
              {g.code}
            </span>
            <div>
              <p className="font-semibold text-sm">{g.label}</p>
              <p className="text-sand/60 text-xs mt-1 leading-relaxed">{g.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
