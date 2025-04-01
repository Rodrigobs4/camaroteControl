import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import "./index.css";
import CadastroPlanejamento from "./pages/CadastroPlanejamento";
import CadastroUsuario from "./pages/CadastroUsuario";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/planejamento" element={<CadastroPlanejamento />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
