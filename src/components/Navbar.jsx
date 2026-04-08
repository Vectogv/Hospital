import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-brand">MediSystem</div>
      <div className="navbar-links">
        <button className={`nav-btn ${isActive("/") ? "nav-btn-active" : ""}`} onClick={() => navigate("/")}>
           Clínicas
        </button>
        <button className={`nav-btn ${isActive("/medicos") ? "nav-btn-active" : ""}`} onClick={() => navigate("/medicos")}>
           Médicos
        </button>
        <button className={`nav-btn ${isActive("/pacientes") ? "nav-btn-active" : ""}`} onClick={() => navigate("/pacientes")}>
           Pacientes
        </button>
      </div>
    </nav>
  )
}
