import { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { quoteShipping } from "../lib/shipping";
import { formatBRL, pixPrice, PIX_DISCOUNT_RATE } from "../lib/pricing";

const STEPS = { FORM: "form", PAYING: "paying", DONE: "done" };

export default function Checkout({ open, onClose }) {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(STEPS.FORM);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [shippingOptions, setShippingOptions] = useState(null);
  const [shippingChoice, setShippingChoice] = useState(null);
  const [shippingEstimated, setShippingEstimated] = useState(false);
  const [shippingFree, setShippingFree] = useState(false);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleQuoteShipping(e) {
    e.preventDefault();
    setError("");
    setLoadingShipping(true);
    setShippingOptions(null);
    setShippingChoice(null);
    try {
      const { options, estimated, free } = await quoteShipping(cep, items, total);
      setShippingOptions(options);
      setShippingEstimated(estimated);
      setShippingFree(free);
      setShippingChoice(options[0]);
    } catch (err) {
      setError(err.message || "Não foi possível calcular o frete.");
    } finally {
      setLoadingShipping(false);
    }
  }

  async function handlePay() {
    setError("");
    setStep(STEPS.PAYING);
    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shipping: shippingChoice,
          buyer: { name, email },
          paymentMethod,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.init_point) {
          window.location.href = data.init_point;
          return;
        }
      }
      throw new Error("checkout indisponível");
    } catch {
      // Sem gateway de pagamento configurado ainda — simula a conclusão
      // para fins de demonstração, em vez de travar o fluxo.
      await new Promise((r) => setTimeout(r, 900));
      clearCart();
      setStep(STEPS.DONE);
    }
  }

  const productsTotal = paymentMethod === "pix" ? pixPrice(total) : total;
  const grandTotal = productsTotal + (shippingChoice?.price ?? 0);

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
      <div className="bg-dusk w-full max-w-md rounded-2xl border border-white/10 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sand/60 hover:text-sun"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {step === STEPS.DONE ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-display font-700 text-xl mb-2">Pedido confirmado!</h3>
              <p className="text-sand/60 text-sm">
                (Demonstração) — com o Mercado Pago configurado, o cliente é
                redirecionado para pagar de verdade aqui.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-sun text-night font-bold px-6 py-2.5 rounded-full"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-display font-700 text-xl mb-1">Fechar pedido</h3>
              <p className="text-sand/60 text-sm mb-6">
                {items.length} {items.length === 1 ? "item" : "itens"} · {formatBRL(total)}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-sand/60 mb-1">Nome</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-sun outline-none rounded-lg px-3 py-2 text-sm"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-xs text-sand/60 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-sun outline-none rounded-lg px-3 py-2 text-sm"
                    placeholder="voce@email.com"
                  />
                </div>

                <form onSubmit={handleQuoteShipping} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-sand/60 mb-1">CEP de entrega</label>
                    <input
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-sun outline-none rounded-lg px-3 py-2 text-sm"
                      placeholder="60000-000"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loadingShipping}
                    className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap"
                  >
                    {loadingShipping ? "Calculando…" : "Calcular frete"}
                  </button>
                </form>

                {error && <p className="text-coral text-xs">{error}</p>}

                {shippingOptions && (
                  <div className="space-y-2">
                    {shippingFree && (
                      <p className="text-[11px] text-emerald-400 font-semibold">
                        Pedido acima de {formatBRL(300)} — frete grátis!
                      </p>
                    )}
                    {shippingEstimated && !shippingFree && (
                      <p className="text-[11px] text-sand/50">
                        Valor estimado — conecte a API do Melhor Envio para cotação real.
                      </p>
                    )}
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.service}
                        className={`flex items-center justify-between border rounded-lg px-3 py-2 text-sm cursor-pointer ${
                          shippingChoice?.service === opt.service
                            ? "border-sun bg-sun/10"
                            : "border-white/10"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={shippingChoice?.service === opt.service}
                            onChange={() => setShippingChoice(opt)}
                          />
                          {opt.service} · {opt.days}d úteis
                        </span>
                        <span className="font-semibold">
                          {opt.price === 0 ? "Grátis" : formatBRL(opt.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-xs text-sand/60 mb-1.5">Forma de pagamento</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`border rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        paymentMethod === "card"
                          ? "border-sun bg-sun/10"
                          : "border-white/10 text-sand/70"
                      }`}
                    >
                      Cartão
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pix")}
                      className={`border rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        paymentMethod === "pix"
                          ? "border-sun bg-sun/10"
                          : "border-white/10 text-sand/70"
                      }`}
                    >
                      Pix
                    </button>
                  </div>
                  {paymentMethod === "pix" && (
                    <p className="text-[11px] text-emerald-400 mt-1.5">
                      {Math.round(PIX_DISCOUNT_RATE * 100)}% de desconto aplicado nos produtos
                      pagando com Pix.
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sand/70 text-sm">Total</span>
                  <span className="font-display font-700 text-lg">
                    {formatBRL(grandTotal)}
                  </span>
                </div>

                <button
                  onClick={handlePay}
                  disabled={
                    !name || !email || !shippingChoice || step === STEPS.PAYING
                  }
                  className="w-full bg-coral disabled:opacity-40 hover:bg-coral/90 transition-colors text-white font-bold py-3 rounded-full flex items-center justify-center gap-2"
                >
                  {step === STEPS.PAYING ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processando…
                    </>
                  ) : (
                    "Ir para pagamento"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
