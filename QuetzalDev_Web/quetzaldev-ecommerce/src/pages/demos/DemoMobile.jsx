import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DemoMobile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("live");
  const [currentTime, setCurrentTime] = useState("");

  // Reloj en tiempo real para las cámaras CCTV
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Formato YYYY-MM-DD HH:MM:SS
      const formatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      setCurrentTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- VISTAS INTERNAS DE LA APP DE CÁMARAS ---

  const renderLiveFeeds = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Monitoreo en Vivo (Cuadrícula)</h3>
        <span
          className="badge warning"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <div className="rec-dot"></div> Grabando
        </span>
      </div>

      <div className="cctv-grid">
        {/* Cámara 1 */}
        <div className="cctv-screen">
          <div className="cctv-scanline" style={{ animationDelay: "0s" }}></div>
          {/* Overlay de la cámara */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            CAM 01 - ENTRADA PRINCIPAL
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            {currentTime}
          </div>
          <div
            style={{
              color: "var(--surface-highlight)",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            SEÑAL DE VIDEO
          </div>
        </div>

        {/* Cámara 2 */}
        <div className="cctv-screen">
          <div className="cctv-scanline" style={{ animationDelay: "1s" }}></div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            CAM 02 - PASILLO NORTE
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            {currentTime}
          </div>
          <div
            style={{
              color: "var(--surface-highlight)",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            SEÑAL DE VIDEO
          </div>
        </div>

        {/* Cámara 3 */}
        <div className="cctv-screen">
          <div
            className="cctv-scanline"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            CAM 03 - BODEGA
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            {currentTime}
          </div>
          <div
            style={{
              color: "var(--surface-highlight)",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            SEÑAL DE VIDEO
          </div>
        </div>

        {/* Cámara 4 */}
        <div className="cctv-screen">
          <div
            className="cctv-scanline"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            CAM 04 - PARQUEO SÓTANO
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              color: "#fff",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              textShadow: "1px 1px 2px #000",
            }}
          >
            {currentTime}
          </div>
          <div
            style={{
              color: "var(--surface-highlight)",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            SEÑAL DE VIDEO
          </div>
        </div>
      </div>
    </>
  );

  const renderAlerts = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Alertas de Movimiento</h3>
        <button
          className="btn-demo"
          style={{ padding: "0.4rem 1rem", fontSize: "0.9rem", flex: "none" }}
        >
          Limpiar Historial
        </button>
      </div>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Gravedad</th>
            <th>Cámara Origen</th>
            <th>Tipo de Evento</th>
            <th>Hora de Detección</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="badge danger">Alta</span>
            </td>
            <td style={{ color: "var(--surface-highlight)" }}>
              CAM 04 - Parqueo
            </td>
            <td>Movimiento fuera de horario</td>
            <td>Hoy, 02:14 AM</td>
          </tr>
          <tr>
            <td>
              <span className="badge warning">Media</span>
            </td>
            <td style={{ color: "var(--surface-highlight)" }}>
              CAM 01 - Entrada
            </td>
            <td>Obstrucción de lente</td>
            <td>Hoy, 06:30 AM</td>
          </tr>
          <tr>
            <td>
              <span className="badge success">Info</span>
            </td>
            <td style={{ color: "var(--surface-highlight)" }}>
              CAM 03 - Bodega
            </td>
            <td>Pérdida de red (Recuperada)</td>
            <td>Ayer, 11:45 PM</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderConfig = () => (
    <>
      <h3 style={{ marginBottom: "1.5rem" }}>Configuración del NVR/DVR</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          color: "var(--text-bright)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--surface)",
            paddingBottom: "1rem",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold" }}>Notificaciones Push</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Recibir alertas de movimiento en el dispositivo móvil.
            </div>
          </div>
          <span className="badge success">Habilitado</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--surface)",
            paddingBottom: "1rem",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold" }}>
              Calidad de Transmisión (RTSP)
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Resolución por defecto para conexiones de red móvil.
            </div>
          </div>
          <select
            style={{
              backgroundColor: "var(--bg-deep)",
              color: "var(--text-bright)",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid var(--surface)",
            }}
          >
            <option>Fluida (480p - Menor latencia)</option>
            <option>HD (720p)</option>
            <option>Full HD (1080p - Mayor consumo)</option>
          </select>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "live":
        return renderLiveFeeds();
      case "alerts":
        return renderAlerts();
      case "config":
        return renderConfig();
      default:
        return renderLiveFeeds();
    }
  };

  return (
    <div className="catalog-container">
      <div className="demo-header-bar" style={{ alignItems: "flex-start" }}>
        <div style={{ maxWidth: "800px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                margin: 0,
                color: "var(--text-bright)",
              }}
            >
              Sentinel UI Template
            </h2>
            <span
              className="badge"
              style={{
                backgroundColor: "var(--surface-highlight)",
                color: "var(--bg-deep)",
                letterSpacing: "1px",
              }}
            >
              LIVE DEMO
            </span>
          </div>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            Simulación del componente frontend para monitoreo de seguridad.
            Observe cómo la interfaz organiza de manera eficiente los flujos de
            video RTSP, las alertas del sistema y la configuración del grabador
            (NVR), ofreciendo una experiencia de usuario lista para integradores
            de seguridad.
          </p>
        </div>

        <button
          className="btn-demo"
          onClick={() => navigate("/catalog")}
          style={{
            flex: "none",
            marginTop: "0.5rem",
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
            style={{ width: 16, height: 16 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Volver al Catálogo
        </button>
      </div>

      <div className="erp-layout">
        <aside className="erp-sidebar">
          <div
            style={{
              marginBottom: "2rem",
              color: "var(--text-bright)",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            Sentinel Mobile
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "live" ? "active" : ""}`}
            onClick={() => setActiveTab("live")}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ width: 20, height: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Vista en Vivo
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "alerts" ? "active" : ""}`}
            onClick={() => setActiveTab("alerts")}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ width: 20, height: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            Alertas / Eventos
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "config" ? "active" : ""}`}
            onClick={() => setActiveTab("config")}
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ width: 20, height: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014-8.81c-2.28-.46-4.676-.71-7.14-.71-2.464 0-4.86.25-7.14.71"
              />
            </svg>
            Conexión NVR
          </div>
        </aside>

        <main className="erp-main">{renderContent()}</main>
      </div>
    </div>
  );
}
