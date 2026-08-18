import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <CartProvider>
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <Catalog />
      <About />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </CartProvider>
  );
}
