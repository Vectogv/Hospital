import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Estilos/styles.css"

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

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([])
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const navigate = useNavigate()

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    const res = await fetch(`${BASE_URL}/pacientes`, { headers: HEADERS })
    setPacientes(await res.json())
  }

  async function guardar() {
    if (!nombre.trim()) return alert("El nombre es obligatorio")
    await fetch(`${BASE_URL}/pacientes`, {
      method: "POST", headers: HEADERS,
      body: JSON.stringify({ nombre, email, telefono, fecha_nacimiento: fechaNacimiento })
    })
    setNombre(""); setEmail(""); setTelefono(""); setFechaNacimiento("")
    cargarDatos()
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este paciente?")) return
    await fetch(`${BASE_URL}/pacientes?id=eq.${id}`, { method: "DELETE", headers: HEADERS })
    cargarDatos()
  }

  return (
    <div className="page">
      <h1 className="page-title"> Pacientes</h1>

      <div className="card">
        <div className="card-title">Registrar nuevo paciente</div>
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
          Listado de pacientes <span className="badge">{pacientes.length}</span>
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
              {pacientes.map(p => (
                <tr key={p.id}>
                  <td className="td-id">{p.id}</td>
                  <td className="td-name">{p.nombre}</td>
                  <td>{p.email}</td>
                  <td>{p.telefono}</td>
                  <td>{formatFecha(p.fecha_nacimiento)}</td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-warning" onClick={() => navigate(`/actualizar-paciente/${p.id}`)}>✏️ Editar</button>
                      <button className="btn btn-danger" onClick={() => eliminar(p.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
              {pacientes.length === 0 && (
                <tr className="empty-row"><td colSpan={6}>Sin pacientes registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
