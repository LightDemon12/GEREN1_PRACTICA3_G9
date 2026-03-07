import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Cálculos de la orden
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const taxes = subtotal * 0.12; // Simulamos 12% de IVA
  const total = subtotal + taxes;

  const handleCheckout = (e) => {
    e.preventDefault(); // Evitamos que la página recargue
    setIsProcessing(true);

    // Simulamos un retraso de red (1.5 segundos) para darle realismo
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart(); // Vaciamos el estado global
    }, 1500);
  };

  // VISTA 1: Éxito de compra
  if (isSuccess) {
    return (
      <div className="catalog-container" style={{ maxWidth: "600px" }}>
        <div className="success-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#22c55e"
            style={{ width: 80, height: 80, margin: "0 auto 1.5rem auto" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 style={{ color: "var(--text-bright)", marginBottom: "1rem" }}>
            ¡Transacción Exitosa!
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            El pago ha sido procesado correctamente. Las licencias y el código
            fuente han sido enviados al correo electrónico registrado.
          </p>
          <button className="btn-primary" onClick={() => navigate("/catalog")}>
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // VISTA 2: Carrito vacío
  if (cart.length === 0) {
    return (
      <div
        className="catalog-container"
        style={{ textAlign: "center", paddingTop: "4rem" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="var(--surface-highlight)"
          style={{
            width: 100,
            height: 100,
            margin: "0 auto 1.5rem auto",
            opacity: 0.5,
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <h2>Tu carrito está vacío</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          Aún no has agregado productos a tu orden.
        </p>
        <button className="btn-primary" onClick={() => navigate("/catalog")}>
          Explorar Catálogo
        </button>
      </div>
    );
  }

  // VISTA 3: Formulario de Pago Activo
  return (
    <div className="catalog-container">
      <div
        className="catalog-header"
        style={{ textAlign: "left", marginBottom: "1rem" }}
      >
        <h2>Finalizar Compra</h2>
        <p>
          Complete los datos de facturación para obtener sus licencias de
          QuetzalDev.
        </p>
      </div>

      <div className="checkout-layout">
        {/* Columna Izquierda: Formulario Falso */}
        <div className="checkout-card">
          <h3
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--surface)",
              paddingBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{
                width: 20,
                height: 20,
                color: "var(--surface-highlight)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Datos de Facturación
          </h3>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Razón Social / Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Ej. Sistemas y Redes S.A."
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Correo Electrónico (Envío de Licencias)</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="admin@empresa.com"
                />
              </div>
              <div className="form-group">
                <label>NIT / ID Fiscal</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="1234567-8"
                />
              </div>
            </div>

            <h3
              style={{
                marginTop: "2rem",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--surface)",
                paddingBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{
                  width: 20,
                  height: 20,
                  color: "var(--surface-highlight)",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              Método de Pago
            </h3>

            <div className="form-group">
              <label>Número de Tarjeta</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="0000 0000 0000 0000"
                maxLength="16"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div className="form-group">
                <label>Vencimiento (MM/AA)</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="12/25"
                />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="***"
                  maxLength="4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Procesando pago..."
                : "Pagar y Descargar Software"}
            </button>
          </form>
        </div>

        {/* Columna Derecha: Resumen de Orden */}
        <div className="checkout-card" style={{ height: "fit-content" }}>
          <h3
            style={{
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--surface)",
              paddingBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{
                width: 20,
                height: 20,
                color: "var(--surface-highlight)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            Resumen de la Orden
          </h3>

          <div style={{ marginBottom: "1.5rem" }}>
            {cart.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                }}
              >
                <span>{item.title}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="order-row">
            <span>Impuestos (IVA 12%)</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="order-row total">
            <span>Total a Pagar</span>
            <span>${total.toFixed(2)} USD</span>
          </div>

          <div
            style={{
              marginTop: "2rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 16, height: 16 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            Simulación segura de transacción. No se realizarán cobros reales.
          </div>
        </div>
      </div>
    </div>
  );
}
