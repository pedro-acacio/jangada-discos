// Padrão de classificação de estado de conservação usado por lojas de disco
// (baseado na escala Goldmine, a mais comum no mercado de vinil). Serve tanto
// pra loja preencher o campo "condition" dos produtos de forma consistente
// quanto pra explicar pro cliente o que cada sigla significa.
export const GRADES = [
  {
    code: "Lacrado",
    label: "Lacrado / Relançamento",
    desc: "Disco novo, ainda lacrado na embalagem original de fábrica.",
  },
  {
    code: "M",
    label: "Mint (M)",
    desc: "Perfeito — nunca tocado, sem nenhum sinal de uso, capa impecável.",
  },
  {
    code: "NM",
    label: "Near Mint (NM)",
    desc: "Praticamente perfeito. Pode ter sido tocado uma ou duas vezes, sem marcas visíveis.",
  },
  {
    code: "VG+",
    label: "Muito bom + (VG+)",
    desc: "Leves marcas de uso que não afetam a audição. Capa em bom estado, com sinais mínimos de manuseio.",
  },
  {
    code: "VG",
    label: "Muito bom (VG)",
    desc: "Sinais visíveis de uso — pode ter leve chiado em trechos, mas toca bem do início ao fim.",
  },
  {
    code: "G",
    label: "Bom (G)",
    desc: "Uso considerável. Chiados e estalos perceptíveis durante a música, mas ainda audível.",
  },
];
