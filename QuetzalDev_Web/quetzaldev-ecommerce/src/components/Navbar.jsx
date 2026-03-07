import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // <-- Importamos el hook

export default function Navbar() {
  const { cart } = useCart(); // <-- Sacamos el carrito del estado global
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2>QuetzalDev</h2>
      </Link>

      <div className="nav-links">
        <button
          className="btn-primary"
          onClick={() => navigate("/checkout")} // <-- Redirigirá a la simulación de pago
          style={{
            padding: "0.4rem 0.8rem",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            style={{ width: "18px", height: "18px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {/* Mostramos la cantidad real de items */}
          Carrito ({cart.length})
        </button>
      </div>
    </nav>
  );
}
