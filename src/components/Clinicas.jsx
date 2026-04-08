import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "https://ayzefqpavjzjndlhlaqb.supabase.co/rest/v1"
const HEADERS = {
  "Authorization": "Bearer sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "apikey": "sb_publishable_Zj15RCo-3FqcpZ_WT7qrNQ_r7oYZOF3",
  "Content-Type": "application/json"
}

export default function Clinicas() {
  const [clinicas, setClinicas] = useState([])
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const navigate = useNavigate()

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    const res = await fetch(`${BASE_URL}/clinicas`, { headers: HEADERS })
    setClinicas(await res.json())
  }

  async function guardar() {
    if (!nombre.trim()) return alert("El nombre es obligatorio")
    await fetch(`${BASE_URL}/clinicas`, {
      method: "POST", headers: HEADERS,
      body: JSON.stringify({ nombre, direccion, telefono })
    })
    setNombre(""); setDireccion(""); setTelefono("")
    cargarDatos()
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar esta clínica?")) return
    await fetch(`${BASE_URL}/clinicas?id=eq.${id}`, { method: "DELETE", headers: HEADERS })
    cargarDatos()
  }

  return (
    <div className="page">

      <div className="card">
        <div className="card-title">Registrar nueva clínica</div>
        <div className="form-row">
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre de la clínica" />
          <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Dirección" />
          <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
          <button className="btn btn-primary" onClick={guardar}>+ Guardar</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          Listado de clínicas <span className="badge">{clinicas.length}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th style={{ width: 160 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clinicas.map(c => (
                <tr key={c.id}>
                  <td className="td-id">{c.id}</td>
                  <td className="td-name">{c.nombre}</td>
                  <td>{c.direccion}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-warning" onClick={() => navigate(`/actualizar-clinica/${c.id}`)}>✏️ Editar</button>
                      <button className="btn btn-danger" onClick={() => eliminar(c.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
              {clinicas.length === 0 && (
                <tr className="empty-row"><td colSpan={5}>Sin clínicas registradas</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
