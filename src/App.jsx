import { BrowserRouter, Routes, Route } from "react-router-dom"
import Clinicas from "./components/Clinicas"
import ActualizarClinica from "./components/ActualizarClinica"
import Medicos from "./components/Medicos"
import ActualizarMedico from "./components/ActualizarMedico"
import Pacientes from "./components/Pacientes"
import ActualizarPaciente from "./components/ActualizarPaciente"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <BrowserRouter>

      {/* 🔥 NAVBAR GLOBAL */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Clinicas />} />
        <Route path="/actualizar-clinica/:id" element={<ActualizarClinica />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/actualizar-medico/:id" element={<ActualizarMedico />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/actualizar-paciente/:id" element={<ActualizarPaciente />} />
      </Routes>

    </BrowserRouter>
  )
}