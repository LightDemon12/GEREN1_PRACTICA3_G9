import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // <-- Importamos el Provider
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Catalog from "./pages/Catalog";
import DemoERP from "./pages/demos/DemoERP";
import DemoWeb from "./pages/demos/DemoWeb";
import DemoMobile from "./pages/demos/DemoMobile";
import Checkout from "./pages/Checkout";

function App() {
  return (
    // Envolvemos todo en el CartProvider
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/demo/prod-01" element={<DemoERP />} />
          <Route path="/demo/prod-02" element={<DemoWeb />} />
          <Route path="/demo/prod-03" element={<DemoMobile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
