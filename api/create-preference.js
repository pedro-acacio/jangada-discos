// Vercel serverless function — cria uma preferência de pagamento no Mercado
// Pago (Checkout Pro) e devolve a URL para redirecionar o cliente.
//
// Exige a variável de ambiente MP_ACCESS_TOKEN (Access Token de PRODUÇÃO da
// conta Mercado Pago da loja, em vercel.com → Project → Settings →
// Environment Variables). Sem essa variável, a função responde 501 e o
// front-end cai no fluxo de demonstração (ver src/components/Checkout.jsx).
import { MercadoPagoConfig, Preference } from "mercadopago";
import { PIX_DISCOUNT_RATE } from "../src/lib/pricing.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(501).json({ error: "Mercado Pago não configurado (MP_ACCESS_TOKEN ausente)" });
    return;
  }

  const { items, shipping, buyer, paymentMethod } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "Carrinho vazio" });
    return;
  }

  // O preço nunca vem do cliente: recalculamos o desconto de Pix aqui a
  // partir do preço de catálogo, pra ninguém conseguir manipular o total no
  // front-end antes de mandar pro Mercado Pago.
  const isPix = paymentMethod === "pix";
  const unitPrice = (price) => Number(price) * (isPix ? 1 - PIX_DISCOUNT_RATE : 1);

  try {
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const mpItems = items.map((item) => ({
      id: item.id,
      title: `${item.title} — ${item.artist}`,
      quantity: item.qty,
      unit_price: unitPrice(item.price),
      currency_id: "BRL",
    }));

    if (shipping?.price) {
      mpItems.push({
        id: "frete",
        title: `Frete — ${shipping.service}`,
        quantity: 1,
        unit_price: Number(shipping.price),
        currency_id: "BRL",
      });
    }

    const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;

    const result = await preference.create({
      body: {
        items: mpItems,
        payer: { name: buyer?.name, email: buyer?.email },
        back_urls: {
          success: `${siteUrl}/?status=success`,
          failure: `${siteUrl}/?status=failure`,
          pending: `${siteUrl}/?status=pending`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/mercado-pago-webhook`,
        // Se o cliente escolheu Pix no nosso checkout (pelo desconto), só faz
        // sentido deixar ele pagar via Pix na tela do Mercado Pago — do
        // contrário alguém pagaria no cartão pelo preço com desconto de Pix.
        // IDs de payment_type conforme a documentação do Checkout Pro;
        // confirme na doc atual da Mercado Pago antes de ir pra produção,
        // esses identificadores podem mudar.
        ...(isPix && {
          payment_methods: {
            excluded_payment_types: [
              { id: "credit_card" },
              { id: "debit_card" },
              { id: "prepaid_card" },
              { id: "ticket" },
              { id: "atm" },
              { id: "digital_currency" },
            ],
          },
        }),
      },
    });

    res.status(200).json({ init_point: result.init_point });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Falha ao criar preferência de pagamento" });
  }
}
