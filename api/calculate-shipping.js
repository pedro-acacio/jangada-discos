// Vercel serverless function — cota o frete via API do Melhor Envio.
//
// Exige MELHOR_ENVIO_TOKEN (token da conta Melhor Envio da loja) e
// MELHOR_ENVIO_FROM_CEP (CEP de origem, o da loja em Fortaleza-CE) como
// variáveis de ambiente. Sem elas, responde 501 e o front-end usa a
// estimativa local (ver src/lib/shipping.js).
const MELHOR_ENVIO_API =
  process.env.MELHOR_ENVIO_ENV === "sandbox"
    ? "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate"
    : "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.MELHOR_ENVIO_TOKEN;
  const fromCep = process.env.MELHOR_ENVIO_FROM_CEP;
  if (!token || !fromCep) {
    res.status(501).json({ error: "Melhor Envio não configurado" });
    return;
  }

  const { cep, items } = req.body ?? {};
  if (!cep || !Array.isArray(items)) {
    res.status(400).json({ error: "Parâmetros inválidos" });
    return;
  }

  try {
    const response = await fetch(MELHOR_ENVIO_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Jangada Discos (contato@jangadadiscos.com)",
      },
      body: JSON.stringify({
        from: { postal_code: fromCep },
        to: { postal_code: cep },
        // Um LP: ~32x32x0.5cm, ~250g. Empacotamento simplificado — ajuste
        // conforme a caixa/envelope real usado pela loja.
        products: items.map((item) => ({
          id: item.id,
          width: 32,
          height: Math.max(1, item.qty) * 0.6,
          length: 32,
          weight: 0.25 * item.qty,
          insurance_value: item.price * item.qty,
          quantity: item.qty,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Melhor Envio respondeu ${response.status}`);
    }

    const data = await response.json();
    const options = data
      .filter((opt) => !opt.error)
      .map((opt) => ({
        service: `${opt.company.name} — ${opt.name}`,
        price: Number(opt.price),
        days: Number(opt.delivery_time),
      }));

    res.status(200).json({ options });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao calcular frete" });
  }
}
