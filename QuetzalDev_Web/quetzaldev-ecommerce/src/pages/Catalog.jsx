import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const QUETZAL_PRODUCTS = [
  {
    id: "prod-01",
    category: "ERP & Gestión",
    title: "Micro-ERP ITSM Lite",
    price: 149.0,
    description:
      "Módulo ligero e instalable para departamentos de TI. Unifica la gestión de tickets de soporte con el inventario riguroso de hardware.",
    features: [
      "Enrutamiento automático de tickets",
      "Vinculación de usuarios/activos",
      "Historial de mantenimiento",
    ],
  },
  {
    id: "prod-02",
    category: "Desarrollo Web",
    title: "Nexus IoT Dashboards",
    price: 59.0,
    description:
      "Plantilla web preconstruida y responsiva para visualización de telemetría. Arquitectura moderna, sin animaciones pesadas.",
    features: [
      "Widgets modulares y gráficas",
      "Integración nativa WebSockets",
      "Tema claro/oscuro incluido",
    ],
  },
  {
    id: "prod-03",
    category: "Apps Móviles",
    title: "Sentinel UI Template",
    price: 89.0,
    description:
      "Componente móvil frontend para monitoreo de seguridad. Interfaz y lógica listas para conectar con cámaras IP y DVRs.",
    features: [
      "Reproductor optimizado RTSP",
      "Vista de cuadrícula multicámara",
      "Integración para notificaciones push",
    ],
  },
];

export default function Catalog() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Calculamos el subtotal para el mini-carrito
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h2>Catálogo de Productos</h2>
        <p>Soluciones empresariales empaquetadas y listas para despliegue.</p>
      </div>

      <div className="products-grid">
        {QUETZAL_PRODUCTS.map((product) => (
          <article key={product.id} className="product-card">
            <span className="product-category">{product.category}</span>
            <h3 className="product-title">{product.title}</h3>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <p className="product-desc">{product.description}</p>
            <ul className="product-features">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="card-actions">
              <button
                className="btn-demo"
                onClick={() => navigate(`/demo/${product.id}`)}
              >
                Ver Demo
              </button>
              <button
                className="btn-add-cart"
                onClick={() => handleAddToCart(product)}
              >
                Al Carrito
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* TARJETA FLOTANTE (MINI-CARRITO) - Solo se muestra si hay productos */}
      {cart.length > 0 && (
        <div className="mini-cart-widget">
          <h4>
            Resumen de Compra
            <span
              className="badge"
              style={{
                backgroundColor: "var(--surface-highlight)",
                color: "var(--bg-deep)",
              }}
            >
              {cart.length} item(s)
            </span>
          </h4>

          <div
            style={{
              maxHeight: "150px",
              overflowY: "auto",
              marginBottom: "1rem",
            }}
          >
            {cart.map((item, idx) => (
              <div key={idx} className="mini-cart-item">
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                >
                  {item.title}
                </span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid var(--surface)",
              paddingTop: "0.5rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            <span>Subtotal:</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>

          <button
            className="btn-primary"
            style={{ width: "100%" }}
            onClick={() => navigate("/checkout")}
          >
            Proceder al Pago →
          </button>
        </div>
      )}
    </div>
  );
}
