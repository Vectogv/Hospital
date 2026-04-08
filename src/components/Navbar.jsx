import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const styles = {
    nav: {
      display: "flex",
      gap: "12px",
      padding: "16px 24px",
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      marginBottom: "20px"
    },
    btn: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      background: "#e2e8f0"
    },
    active: {
      background: "#2b6cb0",
      color: "#fff"
    }
  }

  return (
    <div style={styles.nav}>
      <button
        style={{ ...styles.btn, ...(isActive("/") ? styles.active : {}) }}
        onClick={() => navigate("/")}
      >
         Clínicas
      </button>

      <button
        style={{ ...styles.btn, ...(isActive("/medicos") ? styles.active : {}) }}
        onClick={() => navigate("/medicos")}
      >
         Médicos
      </button>

      <button
        style={{ ...styles.btn, ...(isActive("/pacientes") ? styles.active : {}) }}
        onClick={() => navigate("/pacientes")}
      >
         Pacientes
      </button>
    </div>
  )
}