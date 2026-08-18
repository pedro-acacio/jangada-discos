// Parâmetros comerciais do site — ajuste aqui quando a loja quiser mudar as
// regras de desconto/frete grátis, sem precisar mexer nos componentes.
export const PIX_DISCOUNT_RATE = 0.05; // 5% de desconto pagando via Pix
export const FREE_SHIPPING_THRESHOLD = 300; // frete grátis a partir de R$300
export const INSTALLMENTS = 12; // parcelamento máximo exibido nos cards

export function formatBRL(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function pixPrice(price) {
  return price * (1 - PIX_DISCOUNT_RATE);
}

export function installmentPrice(price, n = INSTALLMENTS) {
  return price / n;
}
