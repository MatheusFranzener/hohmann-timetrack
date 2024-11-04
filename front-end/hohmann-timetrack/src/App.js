import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';
import Header from './components/Header/Header.js';
import Perfil from './pages/Perfil/Perfil.js';
import CadastroFuncionario from './pages/CadastroFuncionario/CadastroFuncionario.js'
import DadosFinanceiros from './pages/DadosFinanceiros/DadosFinanceiros.js';
import RegistrarPonto from './components/Ponto/RegistrarPonto/RegistrarPonto.js';
import EditarPonto from './components/Ponto/EditarPonto/EditarPonto.js';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/perfil"
          element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />}
        />
        <Route
          path="/dados-financeiros"
          element={isAuthenticated ? <DadosFinanceiros /> : <Navigate to="/login" />}
        />
        <Route
          path="/cadastrar-funcionario" element={isAuthenticated ? <CadastroFuncionario /> : <Navigate to="/login" />}
        />
        <Route path="/registrar-ponto" element={isAuthenticated ? <RegistrarPonto /> : <Navigate to="/login" />} />
        <Route path="/editar-ponto/:id" element={isAuthenticated ? <EditarPonto /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;