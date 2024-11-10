import React, { useEffect, useState } from 'react';
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

  const initialFuncionario = [
    {
      idFuncionario: 1,
      email: "admin",
      nome: "Admin",
      senha: "123",
      dataNascimento: "2004-06-23",
      celular: "47991284989",
      endereco: "Rua tal de Julho",
      cidade: "Jaraguá do Sul",
      estado: "SC",
      cep: "89253-300",
      sexo: "Masculino",
      cargo: "Gerente",
      isAdmin: true,
      salarioHora: 30.0
    },
    {
      idFuncionario: 2,
      email: "caroline",
      nome: "Caroline",
      senha: "123",
      dataNascimento: "1985-05-15",
      celular: "47991284989",
      endereco: "Rua B, 456",
      cidade: "Jaraguá do Sul",
      estado: "SC",
      cep: "98765-432",
      sexo: "Feminino",
      cargo: "Costureira",
      isAdmin: false,
      salarioHora: 13.0
    }
  ];

  const initialRegistroPonto = [
    {
      idRegistroPonto: 1,
      idFuncionario: 1,
      dataPonto: "2024-01-01",
      horaEntrada: "08:00",
      horaSaida: "17:00",
      tempoRefeicao: "01:00",
      horasTotais: 8
    },
    {
      idRegistroPonto: 2,
      idFuncionario: 2,
      dataPonto: "2024-01-02",
      horaEntrada: "09:00",
      horaSaida: "18:00",
      tempoRefeicao: "01:00",
      horasTotais: 8
    }
  ];

  const initializeData = () => {
    if (!localStorage.getItem('Funcionario')) {
      localStorage.setItem('Funcionario', JSON.stringify(initialFuncionario));
    }
    if (!localStorage.getItem('RegistroPonto')) {
      localStorage.setItem('RegistroPonto', JSON.stringify(initialRegistroPonto));
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

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