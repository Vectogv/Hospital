import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "https://ayzefqpavjzjndlhlaqb.supabase.co/rest/v1"
const HEADERS = {
  "Authorization": "Bearer sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "apikey": "sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "Content-Type": "application/json"
}

function formatFecha(fecha) {
  if (!fecha) return "—"
  const [y, m, d] = fecha.split("-")
  return `${d}/${m}/${y}`
}

export default function Medicos() {
  const [medicos, setMedicos] = useState([])
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const navigate = useNavigate()

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    const res = await fetch(`${BASE_URL}/medicos`, { headers: HEADERS })
    setMedicos(await res.json())
  }

  async function guardar() {
    if (!nombre.trim()) return alert("El nombre es obligatorio")
    await fetch(`${BASE_URL}/medicos`, {
      method: "POST", headers: HEADERS,
      body: JSON.stringify({ nombre, email, telefono, fecha_nacimiento: fechaNacimiento })
    })
    setNombre(""); setEmail(""); setTelefono(""); setFechaNacimiento("")
    cargarDatos()
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este médico?")) return
    await fetch(`${BASE_URL}/medicos?id=eq.${id}`, { method: "DELETE", headers: HEADERS })
    cargarDatos()
  }

  return (
    <div className="page">
      <h1 className="page-title"> Médicos</h1>

      <div className="card">
        <div className="card-title">Registrar nuevo médico</div>
        <div className="form-row">
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" />
          <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
          <input value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} type="date" />
          <button className="btn btn-primary" onClick={guardar}>+ Guardar</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          Listado de médicos <span className="badge">{medicos.length}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Fecha Nac.</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicos.map(m => (
                <tr key={m.id}>
                  <td className="td-id">{m.id}</td>
                  <td className="td-name">{m.nombre}</td>
                  <td>{m.email}</td>
                  <td>{m.telefono}</td>
                  <td>{formatFecha(m.fecha_nacimiento)}</td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-warning" onClick={() => navigate(`/actualizar-medico/${m.id}`)}>✏️ Editar</button>
                      <button className="btn btn-danger" onClick={() => eliminar(m.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
              {medicos.length === 0 && (
                <tr className="empty-row"><td colSpan={6}>Sin médicos registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
