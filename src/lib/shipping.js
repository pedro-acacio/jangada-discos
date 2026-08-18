import { FREE_SHIPPING_THRESHOLD } from "./pricing";

// Tenta cotar o frete via função serverless (Melhor Envio). Se a função não
// estiver configurada (sem token, rodando só localmente, etc.), cai num
// cálculo estimado por região a partir do CEP, só para não travar a demo.
export async function quoteShipping(cep, items, subtotal) {
  const cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) {
    throw new Error("CEP inválido");
  }

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return {
      options: [{ service: "Frete grátis (PAC)", price: 0, days: 6 }],
      estimated: false,
      free: true,
    };
  }

  try {
    const res = await fetch("/api/calculate-shipping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cep: cleanCep, items }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.options) && data.options.length > 0) {
        return { options: data.options, estimated: false, free: false };
      }
    }
  } catch {
    // segue para a estimativa local
  }

  return { options: estimateByRegion(cleanCep), estimated: true, free: false };
}

function estimateByRegion(cep) {
  const region = Number(cep[0]);
  // Faixa bem aproximada por região dos Correios a partir do 1º dígito do CEP,
  // só para dar um número plausível quando não há integração real configurada.
  const table = {
    0: { base: 24, days: 6 }, // SP capital
    1: { base: 26, days: 7 }, // interior SP
    2: { base: 28, days: 7 }, // RJ/ES
    3: { base: 30, days: 8 }, // MG
    4: { base: 22, days: 5 }, // BA/SE (perto do CE)
    5: { base: 20, days: 4 }, // PE/AL/PB/RN
    6: { base: 18, days: 3 }, // CE/PI/MA (mesma região da loja)
    7: { base: 34, days: 9 }, // DF/GO/TO/MT/MS
    8: { base: 38, days: 10 }, // PR/SC
    9: { base: 40, days: 11 }, // RS
  };
  const { base, days } = table[region] ?? { base: 30, days: 8 };

  return [
    { service: "PAC (estimado)", price: base, days },
    { service: "SEDEX (estimado)", price: base * 1.7, days: Math.max(2, days - 3) },
  ];
}
