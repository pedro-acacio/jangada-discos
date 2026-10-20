# Jangada Discos

Online store for Jangada Discos (Fortaleza, CE, Brazil) — catalog, cart, shipping
calculation and payment. Stack: React + Vite + Tailwind on the front end, serverless
functions (Vercel) to integrate Mercado Pago and Melhor Envio.

## Running locally

```bash
npm install
npm run dev
```

Without the environment variables configured, the site works normally in
demo mode: shipping uses a local per-region estimate and the payment
button simulates a completed order instead of redirecting to the real
Mercado Pago.

## Built-in features (inspired by Hifive Discos and Direct Discos)

- Free shipping above a minimum amount, a discount for paying via Pix and
  installments shown on the cards — parameters configurable in
  `src/lib/pricing.js` (`FREE_SHIPPING_THRESHOLD`, `PIX_DISCOUNT_RATE`,
  `INSTALLMENTS`). The Pix discount is recalculated on the server
  (`api/create-preference.js`), never trusting the price coming from the
  browser, and the Mercado Pago preference already restricts the payment
  method to Pix when that discount is applied.
- The "Comprar" (Buy) button on the cards does a quick purchase (adds to the cart and opens
  checkout directly); the "+" next to it only adds to the cart without leaving the page.
- Favorites (heart on the cards + a "Favoritos" filter in the catalog),
  persisted in localStorage.
- Record grading table (`#classificacao`), on the Goldmine scale
  (Mint, NM, VG+, VG, etc.) — data in `src/data/grading.js`.
- Floating contact button pointing to the store's Instagram (I didn't make up
  a WhatsApp number — replace it with the real link once the store has one).

## What's missing to go live for real

1. **Real catalog** — `src/data/products.js` has 9 sample records (illustrative
   covers, not real photos). Replace them with the store's real records, photos, prices and
   stock — today it's a static list in the code; if the
   catalog changes often, it's worth migrating to a spreadsheet/CMS/database
   with a simple editing panel.
2. **Mercado Pago** — create `MP_ACCESS_TOKEN` (the store account's production Access Token)
   and set it as an environment variable on Vercel. See
   `api/create-preference.js` and `.env.example`.
3. **Melhor Envio** — create `MELHOR_ENVIO_TOKEN` and `MELHOR_ENVIO_FROM_CEP`
   (the store's postal code). See `api/calculate-shipping.js`.
4. **Custom domain** — point a domain (e.g. jangadadiscos.com.br) to the
   Vercel deployment.
5. **Order confirmation by email/WhatsApp** — currently an approved payment
   doesn't trigger any notification; this is usually done by listening to the
   Mercado Pago webhook (`notification_url` is already set in
   `api/create-preference.js`, the handler still needs to be implemented).

## Deploy

The project is ready to deploy directly on Vercel (`vercel.com` → import the
repository). The `api/` folders automatically become serverless functions.
