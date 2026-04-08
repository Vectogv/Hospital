import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "36px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  header: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" },
  headerIcon: { fontSize: "28px" },
  title: { fontSize: "22px", fontWeight: "700", color: "#1a365d", margin: 0 },
  label: {
    display: "block", fontSize: "13px", fontWeight: "600",
    color: "#4a5568", marginBottom: "6px", marginTop: "16px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
    background: "#f7fafc",
    boxSizing: "border-box",
  },
  actions: { display: "flex", gap: "12px", marginTop: "28px" },
  btnPrimary: {
    flex: 1, padding: "12px",
    background: "#276749", color: "#fff",
    border: "none", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600", cursor: "pointer",
  },
  btnSecondary: {
    flex: 1, padding: "12px",
    background: "#e2e8f0", color: "#4a5568",
    border: "none", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600", cursor: "pointer",
  },
}

export default function ActualizarMedico() {
  const [nombre, setNombre] = useState("")
  const [especialidad, setEspecialidad] = useState("")
  const [email, setEmail] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => { cargarMedico() }, [])

  async function cargarMedico() {
    const res = await fetch(`${URL}/medicos?id=eq.${id}`, { headers: HEADERS })
    const data = await res.json()
    setNombre(data[0].nombre)
    setEspecialidad(data[0].especialidad)
    setEmail(data[0].email)
  }

  async function actualizar() {
    await fetch(`${URL}/medicos?id=eq.${id}`, {
      method: "PATCH", headers: HEADERS,
      body: JSON.stringify({ nombre, especialidad, email })
    })
    alert("✅ Médico actualizado correctamente")
    navigate(-1)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.headerIcon}>👨‍⚕️</span>
          <h1 style={styles.title}>Editar Médico</h1>
        </div>

        <label style={styles.label}>Nombre</label>
        <input style={styles.input} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" />

        <label style={styles.label}>Especialidad</label>
        <input style={styles.input} value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} placeholder="Especialidad médica" />

        <label style={styles.label}>Correo electrónico</label>
        <input style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" type="email" />

        <div style={styles.actions}>
          <button style={styles.btnSecondary} onClick={() => navigate(-1)}>← Cancelar</button>
          <button style={styles.btnPrimary} onClick={actualizar}>💾 Actualizar</button>
        </div>
      </div>
    </div>
  )
}
