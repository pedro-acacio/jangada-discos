# Jangada Discos

Loja online da Jangada Discos (Fortaleza, CE) — catálogo, carrinho, cálculo de
frete e pagamento. Stack: React + Vite + Tailwind no front-end, funções
serverless (Vercel) para integrar Mercado Pago e Melhor Envio.

## Rodando localmente

```bash
npm install
npm run dev
```

Sem as variáveis de ambiente configuradas, o site funciona normalmente em
modo demonstração: o frete usa uma estimativa local por região e o botão de
pagamento simula um pedido concluído em vez de redirecionar para o Mercado
Pago de verdade.

## O que falta para ir ao ar de verdade

1. **Catálogo real** — `src/data/products.js` tem 9 discos de exemplo (capas
   ilustrativas, não fotos reais). Trocar pelos discos, fotos, preços e
   estoque reais da loja — hoje é uma lista estática no código; se o
   catálogo mudar com frequência, vale migrar para uma planilha/CMS/banco de
   dados com um painel simples de edição.
2. **Mercado Pago** — criar `MP_ACCESS_TOKEN` (Access Token de produção da
   conta da loja) e configurar como variável de ambiente na Vercel. Ver
   `api/create-preference.js` e `.env.example`.
3. **Melhor Envio** — criar `MELHOR_ENVIO_TOKEN` e `MELHOR_ENVIO_FROM_CEP`
   (CEP da loja). Ver `api/calculate-shipping.js`.
4. **Domínio próprio** — apontar um domínio (ex. jangadadiscos.com.br) para o
   deploy da Vercel.
5. **Confirmação de pedido por e-mail/WhatsApp** — hoje o pagamento aprovado
   não dispara nenhuma notificação; normalmente isso é feito escutando o
   webhook do Mercado Pago (`notification_url` já está configurada em
   `api/create-preference.js`, falta implementar o handler).

## Deploy

Projeto pronto para deploy direto na Vercel (`vercel.com` → importar o
repositório). As pastas `api/` viram funções serverless automaticamente.
