import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const BASE_URL = "https://ayzefqpavjzjndlhlaqb.supabase.co/rest/v1"
const HEADERS = {
  "Authorization": "Bearer sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "apikey": "sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "Content-Type": "application/json"
}

export default function ActualizarMedico() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => { cargarMedico() }, [])

  async function cargarMedico() {
    const res = await fetch(`${BASE_URL}/medicos?id=eq.${id}`, { headers: HEADERS })
    const data = await res.json()
    if (data[0]) {
      setNombre(data[0].nombre)
      setEmail(data[0].email)
      setTelefono(data[0].telefono)
      setFechaNacimiento(data[0].fecha_nacimiento || "")
    }
  }

  async function actualizar() {
    if (!nombre.trim()) return alert("El nombre es obligatorio")
    await fetch(`${BASE_URL}/medicos?id=eq.${id}`, {
      method: "PATCH", headers: HEADERS,
      body: JSON.stringify({ nombre, email, telefono, fecha_nacimiento: fechaNacimiento })
    })
    alert(" Médico actualizado correctamente")
    navigate(-1)
  }

  return (
    <div className="edit-page">
      <div className="edit-card">
        <div className="edit-header">
          <h1>Editar Médico</h1>
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" />
        </div>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" type="email" />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Número de teléfono" />
        </div>
        <div className="form-group">
          <label>Fecha de nacimiento</label>
          <input value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} type="date" />
        </div>
        <div className="edit-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Cancelar</button>
          <button className="btn btn-primary" onClick={actualizar}> Actualizar</button>
        </div>
      </div>
    </div>
  )
}
