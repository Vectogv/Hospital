import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const URL = "https://ayzefqpavjzjndlhlaqb.supabase.co/rest/v1"
const HEADERS = {
  "Authorization": "Bearer sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "apikey": "sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "Content-type": "application/json"
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4f8",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "32px 24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "28px",
  },
  headerIcon: {
    fontSize: "32px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a365d",
    margin: 0,
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#718096",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "16px",
  },
  formRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  input: {
    flex: "1",
    minWidth: "160px",
    padding: "10px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
    transition: "border-color 0.2s",
    background: "#f7fafc",
  },
  btnPrimary: {
    padding: "10px 22px",
    background: "#2b6cb0",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  btnWarning: {
    padding: "7px 14px",
    background: "#ed8936",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "6px",
  },
  btnDanger: {
    padding: "7px 14px",
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    padding: "10px 14px",
    background: "#ebf4ff",
    color: "#2b6cb0",
    fontWeight: "700",
    fontSize: "13px",
    borderBottom: "2px solid #bee3f8",
  },
  td: {
    padding: "12px 14px",
    borderBottom: "1px solid #e2e8f0",
    color: "#4a5568",
    verticalAlign: "middle",
  },
  trHover: {
    background: "#f7fafc",
  },
  badge: {
    display: "inline-block",
    background: "#ebf4ff",
    color: "#2b6cb0",
    borderRadius: "20px",
    padding: "2px 10px",
    fontSize: "12px",
    fontWeight: "600",
  },
}

export default function Clinicas() {
  const [clinicas, setCLinicas] = useState([])
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [hoveredRow, setHoveredRow] = useState(null)
  const navigate = useNavigate()

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    const res = await fetch(`${URL}/clinicas`, { headers: HEADERS })
    const data = await res.json()
    setCLinicas(data)
  }

  async function guardar() {
    if (!nombre.trim()) return
    await fetch(`${URL}/clinicas`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ nombre, direccion, telefono })
    })
    setNombre(""); setDireccion(""); setTelefono("")
    cargarDatos()
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar esta clínica?")) return
    await fetch(`${URL}/clinicas?id=eq.${id}`, { method: "DELETE", headers: HEADERS })
    cargarDatos()
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Clínicas</h1>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Registrar nueva clínica</div>
        <div style={styles.formRow}>
          <input
            style={styles.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la clínica"
          />
          <input
            style={styles.input}
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección"
          />
          <input
            style={styles.input}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
          />
          <button style={styles.btnPrimary} onClick={guardar}>
            + Guardar
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>
          Listado de clínicas &nbsp;
          <span style={styles.badge}>{clinicas.length}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Dirección</th>
                <th style={styles.th}>Teléfono</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clinicas.map((c) => (
                <tr
                  key={c.id}
                  style={hoveredRow === c.id ? styles.trHover : {}}
                  onMouseEnter={() => setHoveredRow(c.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={styles.td}>{c.id}</td>
                  <td style={{ ...styles.td, fontWeight: "600", color: "#2d3748" }}>{c.nombre}</td>
                  <td style={styles.td}>{c.direccion}</td>
                  <td style={styles.td}>{c.telefono}</td>
                  <td style={styles.td}>
                    <button style={styles.btnWarning} onClick={() => navigate("actualizar-clinica/" + c.id)}>
                       Editar
                    </button>
                    <button style={styles.btnDanger} onClick={() => eliminar(c.id)}>
                       Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {clinicas.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ ...styles.td, textAlign: "center", color: "#a0aec0", padding: "32px" }}>
                    No hay clínicas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
