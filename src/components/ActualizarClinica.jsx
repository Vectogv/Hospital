import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const BASE_URL = "https://ayzefqpavjzjndlhlaqb.supabase.co/rest/v1"
const HEADERS = {
  "Authorization": "Bearer sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "apikey": "sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "Content-Type": "application/json"
}

export default function ActualizarClinica() {
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => { cargarClinica() }, [])

  async function cargarClinica() {
    const res = await fetch(`${BASE_URL}/clinicas?id=eq.${id}`, { headers: HEADERS })
    const data = await res.json()
    if (data[0]) {
      setNombre(data[0].nombre)
      setDireccion(data[0].direccion)
      setTelefono(data[0].telefono)
    }
  }

  async function actualizar() {
    if (!nombre.trim()) return alert("El nombre es obligatorio")
    await fetch(`${BASE_URL}/clinicas?id=eq.${id}`, {
      method: "PATCH", headers: HEADERS,
      body: JSON.stringify({ nombre, direccion, telefono })
    })
    alert(" Clínica actualizada correctamente")
    navigate(-1)
  }

  return (
    <div className="edit-page">
      <div className="edit-card">
        <div className="edit-header">
          <h1>Editar Clínica</h1>
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre de la clínica" />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Dirección" />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
        </div>
        <div className="edit-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Cancelar</button>
          <button className="btn btn-primary" onClick={actualizar}>💾 Actualizar</button>
        </div>
      </div>
    </div>
  )
}
