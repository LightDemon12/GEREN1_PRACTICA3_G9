import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* La Navbar ya no está aquí, vive en App.jsx */}
      <main style={{ padding: 0, maxWidth: "100%" }}>
        <section className="hero-section">
          {/* Elementos del fondo animado */}
          <div className="grid-background"></div>
          <div className="hero-overlay"></div>

          {/* Contenido principal */}
          <div className="hero-content">
            <h1>Código de Agencia. Formato Plug-and-Play.</h1>
            <p>
              Soluciones de software preconstruidas con calidad empresarial.
              Acelera tu desarrollo con nuestros módulos ERP, dashboards web y
              plantillas móviles.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("/catalog")}
            >
              Ver Catálogo de Productos
            </button>
          </div>
        </section>

        <section className="services-grid">
          <div className="service-card">
            <h3>ERP & Gestión</h3>
            <p>
              Módulos de administración, control de activos y soporte IT listos
              para desplegar en tu infraestructura.
            </p>
          </div>
          <div className="service-card">
            <h3>Desarrollo Web</h3>
            <p>
              Interfaces limpias, dashboards para IoT y vistas gráficas
              optimizadas sin bloatware innecesario.
            </p>
          </div>
          <div className="service-card">
            <h3>Apps Móviles</h3>
            <p>
              Componentes y plantillas nativas para monitoreo, seguridad y
              consumo de APIs en tiempo real.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
