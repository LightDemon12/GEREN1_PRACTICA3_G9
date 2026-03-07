import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Datos iniciales para la simulación
const INITIAL_DATA = Array.from({ length: 10 }).map((_, i) => ({
  time: `00:0${i}`,
  temperatura: 22 + Math.random() * 2,
  energia: 120 + Math.random() * 30,
}));

export default function DemoWeb() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("telemetria");

  // Estado de telemetría en tiempo real
  const [liveData, setLiveData] = useState(INITIAL_DATA);
  const [currentMetrics, setCurrentMetrics] = useState({
    temp: 23.5,
    power: 135,
    status: "Conectado",
  });

  // Simulador de WebSockets (Actualiza datos cada 2 segundos)
  useEffect(() => {
    if (activeTab !== "telemetria") return;

    const interval = setInterval(() => {
      const date = new Date();
      const timeStr = `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, "0")}`;

      const newTemp = 22 + Math.random() * 3;
      const newPower = 120 + Math.random() * 40;

      setLiveData((prev) => {
        const newData = [
          ...prev.slice(1),
          { time: timeStr, temperatura: newTemp, energia: newPower },
        ];
        return newData;
      });

      setCurrentMetrics({
        temp: newTemp.toFixed(1),
        power: Math.floor(newPower),
        status: "Sincronizando...",
      });

      // Regresar el status a "Conectado" rápido para dar efecto de "ping"
      setTimeout(
        () => setCurrentMetrics((m) => ({ ...m, status: "Conectado" })),
        500,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // --- VISTAS INTERNAS DEL DASHBOARD IOT ---

  const renderTelemetria = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ color: "var(--text-bright)", margin: 0 }}>
          Telemetría en Tiempo Real
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor:
                currentMetrics.status === "Sincronizando..."
                  ? "var(--surface-highlight)"
                  : "#22c55e",
              boxShadow:
                currentMetrics.status === "Sincronizando..."
                  ? "0 0 8px var(--surface-highlight)"
                  : "0 0 8px #22c55e",
            }}
          />
          WebSocket: {currentMetrics.status}
        </div>
      </div>

      {/* Tarjetas de Sensores en Vivo */}
      <div className="erp-stats-grid">
        <div
          className="erp-stat-card"
          style={{ borderTop: "3px solid #ef4444" }}
        >
          <h4>Temp. Promedio (Rack A)</h4>
          <div className="value">
            {currentMetrics.temp}{" "}
            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
              °C
            </span>
          </div>
        </div>
        <div
          className="erp-stat-card"
          style={{ borderTop: "3px solid var(--surface-highlight)" }}
        >
          <h4>Consumo Eléctrico</h4>
          <div className="value">
            {currentMetrics.power}{" "}
            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
              kW/h
            </span>
          </div>
        </div>
        <div
          className="erp-stat-card"
          style={{ borderTop: "3px solid #22c55e" }}
        >
          <h4>Nodos Activos</h4>
          <div className="value">
            24{" "}
            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
              / 24
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Gráfica de Área: Consumo Eléctrico */}
        <div
          style={{
            backgroundColor: "var(--bg-base)",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid var(--surface)",
          }}
        >
          <h4
            style={{
              color: "var(--text-muted)",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              textTransform: "uppercase",
            }}
          >
            Fluctuación de Consumo (Live)
          </h4>
          <div style={{ height: "250px", width: "100%" }}>
            <ResponsiveContainer>
              <AreaChart
                data={liveData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEnergia" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--surface-highlight)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--surface-highlight)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--surface)"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 20", "dataMax + 20"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-deep)",
                    borderColor: "var(--surface)",
                    color: "var(--text-bright)",
                    borderRadius: "6px",
                  }}
                  itemStyle={{ color: "var(--surface-highlight)" }}
                />
                <Area
                  type="monotone"
                  dataKey="energia"
                  name="Energía (kW/h)"
                  stroke="var(--surface-highlight)"
                  fillOpacity={1}
                  fill="url(#colorEnergia)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica de Líneas: Temperatura */}
        <div
          style={{
            backgroundColor: "var(--bg-base)",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid var(--surface)",
          }}
        >
          <h4
            style={{
              color: "var(--text-muted)",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              textTransform: "uppercase",
            }}
          >
            Control Térmico (Live)
          </h4>
          <div style={{ height: "200px", width: "100%" }}>
            <ResponsiveContainer>
              <LineChart
                data={liveData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--surface)"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[20, 28]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-deep)",
                    borderColor: "var(--surface)",
                    color: "var(--text-bright)",
                    borderRadius: "6px",
                  }}
                  itemStyle={{ color: "#ef4444" }}
                />
                <Line
                  type="monotone"
                  dataKey="temperatura"
                  name="Temperatura (°C)"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );

  const renderDispositivos = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Gestión de Dispositivos Edge</h3>
        <button
          className="btn-primary"
          style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}
        >
          Añadir Nodo
        </button>
      </div>
      <table className="demo-table">
        <thead>
          <tr>
            <th>ID Nodo</th>
            <th>Ubicación</th>
            <th>Protocolo</th>
            <th>Señal</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                color: "var(--surface-highlight)",
                fontFamily: "monospace",
              }}
            >
              ND-84A2
            </td>
            <td>Rack Principal (Zona A)</td>
            <td>MQTT</td>
            <td>
              <span style={{ color: "#22c55e" }}>Excelente (-45dBm)</span>
            </td>
            <td>
              <span className="badge success">En Línea</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: "var(--surface-highlight)",
                fontFamily: "monospace",
              }}
            >
              ND-11B4
            </td>
            <td>Tablero Eléctrico Ext.</td>
            <td>CoAP</td>
            <td>
              <span style={{ color: "#eab308" }}>Débil (-82dBm)</span>
            </td>
            <td>
              <span className="badge warning">Latencia Alta</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                color: "var(--surface-highlight)",
                fontFamily: "monospace",
              }}
            >
              ND-99C1
            </td>
            <td>Cuarto de Baterías</td>
            <td>MQTT</td>
            <td>
              <span style={{ color: "var(--text-muted)" }}>Sin Señal</span>
            </td>
            <td>
              <span className="badge danger">Fuera de Línea</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderConfig = () => (
    <>
      <h3 style={{ marginBottom: "1.5rem" }}>Ajustes del Dashboard</h3>
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
            <div style={{ fontWeight: "bold" }}>
              Tema de Interfaz (Simulado)
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Alternar entre paleta clara y oscura.
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
            <option>Modo Oscuro (Catppuccin)</option>
            <option>Modo Claro</option>
          </select>
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
              Frecuencia de Actualización (WebSockets)
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Intervalo de sondeo a la API de sensores.
            </div>
          </div>
          <span className="badge success">2000 ms</span>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "telemetria":
        return renderTelemetria();
      case "dispositivos":
        return renderDispositivos();
      case "config":
        return renderConfig();
      default:
        return renderTelemetria();
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
              Nexus IoT Dashboards
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
            Demostración de la plantilla web para telemetría. Observe cómo los
            widgets modulares y gráficas vectoriales (SVG) procesan y renderizan
            datos simulados en tiempo real sin sacrificar el rendimiento del
            navegador, ideal para centros de datos y monitoreo industrial.
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
            Nexus Control Room
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "telemetria" ? "active" : ""}`}
            onClick={() => setActiveTab("telemetria")}
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
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
            Señal en Vivo
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "dispositivos" ? "active" : ""}`}
            onClick={() => setActiveTab("dispositivos")}
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
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 009 19.5z"
              />
            </svg>
            Nodos Edge
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
                d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.79l.39-1.51m7.535-9.09l.39-1.51M12 21.3V19.5m0-15V3m0 0h.008v.008H12V3z"
              />
            </svg>
            Configuración UI
          </div>
        </aside>

        <main className="erp-main">{renderContent()}</main>
      </div>
    </div>
  );
}
