import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import GradingGuide from "./components/GradingGuide";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import ContactButton from "./components/ContactButton";

function Store() {
  const { addItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  function handleBuyNow(product) {
    addItem(product);
    setCheckoutOpen(true);
  }

  return (
    <>
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <Catalog onBuyNow={handleBuyNow} />
      <GradingGuide />
      <About />
      <Footer />

      <ContactButton />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Store />
      </FavoritesProvider>
    </CartProvider>
  );
}
