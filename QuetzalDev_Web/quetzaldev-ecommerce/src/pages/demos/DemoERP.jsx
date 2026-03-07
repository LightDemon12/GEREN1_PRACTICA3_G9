import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// --- DATOS FALSOS PARA LAS GRÁFICAS ---
const ticketData = [
  { name: "Lun", creados: 12, resueltos: 10 },
  { name: "Mar", creados: 19, resueltos: 15 },
  { name: "Mié", creados: 8, resueltos: 12 },
  { name: "Jue", creados: 14, resueltos: 13 },
  { name: "Vie", creados: 22, resueltos: 18 },
  { name: "Sáb", creados: 5, resueltos: 7 },
  { name: "Dom", creados: 2, resueltos: 4 },
];

const inventoryData = [
  { name: "Operativo", value: 280 },
  { name: "En Revisión", value: 42 },
  { name: "Obsoleto/Baja", value: 20 },
];

// Colores basados en tu paleta y estados (Verde, Amarillo, Rojo)
const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export default function DemoERP() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // --- VISTAS INTERNAS DEL MÓDULO ERP ---

  const renderDashboard = () => (
    <>
      <h3 style={{ marginBottom: "1.5rem", color: "var(--text-bright)" }}>
        Resumen Operativo
      </h3>

      {/* Tarjetas Superiores */}
      <div className="erp-stats-grid">
        <div className="erp-stat-card">
          <h4>Tickets Pendientes</h4>
          <div className="value">14</div>
        </div>
        <div className="erp-stat-card">
          <h4>Equipos Asignados</h4>
          <div className="value">342</div>
        </div>
        <div className="erp-stat-card">
          <h4>Mantenimientos Hoy</h4>
          <div className="value" style={{ color: "#eab308" }}>
            3
          </div>
        </div>
      </div>

      {/* Sección de Gráficas Modernas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Gráfica de Barras: Actividad de Tickets */}
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
            Volumen de Tickets (Últimos 7 días)
          </h4>
          <div style={{ height: "250px", width: "100%" }}>
            <ResponsiveContainer>
              <BarChart
                data={ticketData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--surface)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-deep)",
                    borderColor: "var(--surface)",
                    color: "var(--text-bright)",
                    borderRadius: "6px",
                  }}
                  itemStyle={{ color: "var(--text-bright)" }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "10px",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                />
                <Bar
                  dataKey="creados"
                  name="Tickets Creados"
                  fill="var(--surface-highlight)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="resueltos"
                  name="Tickets Resueltos"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfica de Anillo: Estado de Inventario */}
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
              textAlign: "center",
            }}
          >
            Estado del Hardware
          </h4>
          <div style={{ height: "250px", width: "100%" }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-deep)",
                    borderColor: "var(--surface)",
                    color: "var(--text-bright)",
                    borderRadius: "6px",
                  }}
                  itemStyle={{ color: "var(--text-bright)" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>
        Tickets Recientes de Alta Prioridad
      </h3>
      <table className="demo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Activo Físico</th>
            <th>Falla Reportada</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: "var(--surface-highlight)" }}>#TK-1042</td>
            <td>Ing. Carlos Pérez</td>
            <td>Laptop L-014 (ThinkPad T14)</td>
            <td>Pantalla azul al compilar</td>
            <td>
              <span className="badge warning">En Revisión</span>
            </td>
          </tr>
          <tr>
            <td style={{ color: "var(--surface-highlight)" }}>#TK-1044</td>
            <td>Lic. Mario Gómez</td>
            <td>Servidor S-02 (Local)</td>
            <td>Alarma de temperatura alta</td>
            <td>
              <span className="badge danger">Crítico</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderTickets = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Gestión de Tickets</h3>
        <button
          className="btn-primary"
          style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}
        >
          + Nuevo Ticket
        </button>
      </div>
      <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
        Mostrando todos los tickets activos del departamento de TI.
      </p>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Prioridad</th>
            <th>Ticket</th>
            <th>Asunto</th>
            <th>Asignado a (Técnico)</th>
            <th>Última Act.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="badge danger">Alta</span>
            </td>
            <td style={{ color: "var(--surface-highlight)" }}>#TK-1044</td>
            <td>Servidor S-02 reporta 85°C</td>
            <td>Luis Martínez</td>
            <td>Hace 10 min</td>
          </tr>
          <tr>
            <td>
              <span className="badge warning">Media</span>
            </td>
            <td style={{ color: "var(--surface-highlight)" }}>#TK-1042</td>
            <td>BSOD constante en compilación</td>
            <td>Andrea Juárez</td>
            <td>Hace 2 hrs</td>
          </tr>
          <tr>
            <td>
              <span className="badge success">Baja</span>
            </td>
            <td style={{ color: "var(--surface-highlight)" }}>#TK-1045</td>
            <td>Solicitud de upgrade de RAM</td>
            <td>Pendiente Asignación</td>
            <td>Ayer</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderInventory = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h3>Inventario de Hardware</h3>
        <button
          className="btn-demo"
          style={{ padding: "0.4rem 1rem", fontSize: "0.9rem", flex: "none" }}
        >
          Exportar CSV
        </button>
      </div>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo / Modelo</th>
            <th>S/N (MAC Address)</th>
            <th>Ubicación / Asignado</th>
            <th>Estado del Activo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: "var(--surface-highlight)" }}>L-014</td>
            <td>Laptop ThinkPad T14 Gen 2</td>
            <td>PF-342A1Z</td>
            <td>Ing. Carlos Pérez (Desarrollo)</td>
            <td>
              <span className="badge warning">Mantenimiento</span>
            </td>
          </tr>
          <tr>
            <td style={{ color: "var(--surface-highlight)" }}>S-02</td>
            <td>Servidor Dell PowerEdge R740</td>
            <td>00:1A:2B:3C:4D:5E</td>
            <td>Rack 3 (Data Center)</td>
            <td>
              <span className="badge success">Operativo</span>
            </td>
          </tr>
          <tr>
            <td style={{ color: "var(--surface-highlight)" }}>P-044</td>
            <td>Impresora HP LaserJet Pro</td>
            <td>CN-847291</td>
            <td>Contabilidad (Nivel 2)</td>
            <td>
              <span className="badge success">Operativo</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderUsers = () => (
    <>
      <h3 style={{ marginBottom: "1.5rem" }}>Directorio de Usuarios IT</h3>
      <table className="demo-table">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Departamento</th>
            <th>Rol en Sistema</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Luis Martínez</td>
            <td>Infraestructura IT</td>
            <td>Administrador Nivel 3</td>
            <td>
              <span className="badge success">Activo</span>
            </td>
          </tr>
          <tr>
            <td>Andrea Juárez</td>
            <td>Soporte Técnico</td>
            <td>Técnico Nivel 1</td>
            <td>
              <span className="badge success">Activo</span>
            </td>
          </tr>
          <tr>
            <td>Ing. Carlos Pérez</td>
            <td>Desarrollo de Software</td>
            <td>Usuario Estándar</td>
            <td>
              <span className="badge success">Activo</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderConfig = () => (
    <>
      <h3 style={{ marginBottom: "1.5rem" }}>Configuración del Módulo</h3>
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
              Sincronización con Active Directory
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Actualizar usuarios automáticamente desde el servidor LDAP.
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
              Notificaciones por Correo Electrónico
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Enviar alertas al crear o actualizar tickets (SMTP externo).
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
            <div style={{ fontWeight: "bold" }}>Modo de Depuración (Debug)</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Registrar logs detallados de red y rendimiento.
            </div>
          </div>
          <span className="badge danger">Deshabilitado</span>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "tickets":
        return renderTickets();
      case "inventory":
        return renderInventory();
      case "users":
        return renderUsers();
      case "config":
        return renderConfig();
      default:
        return renderDashboard();
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
              Micro-ERP ITSM Lite
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
            Entorno de simulación en vivo del módulo de Gestión de Servicios de
            TI (ITSM). Explore cómo la plataforma unifica el enrutamiento de
            tickets de soporte con el control riguroso de activos de hardware,
            optimizando los tiempos de respuesta operativos.
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
            QuetzalDev ITSM
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
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
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
            Dashboard
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "tickets" ? "active" : ""}`}
            onClick={() => setActiveTab("tickets")}
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
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
            Tickets de Soporte
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
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
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
            Inventario
          </div>

          <div
            className={`erp-sidebar-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
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
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            Usuarios
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
            Configuración
          </div>
        </aside>

        <main className="erp-main">{renderContent()}</main>
      </div>
    </div>
  );
}
