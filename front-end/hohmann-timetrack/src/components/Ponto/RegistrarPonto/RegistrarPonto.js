import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Ponto.css';

const RegistrarPonto = () => {
  const navigate = useNavigate();
  const [diaTrabalhado, setDiaTrabalhado] = useState(null);
  const [horaEntrada, setHoraEntrada] = useState(null);
  const [horaSaida, setHoraSaida] = useState(null);

  const calcularHorasTotais = () => {
    if (horaEntrada && horaSaida) {
      const entrada = new Date(`1970-01-01T${horaEntrada.toLocaleTimeString()}`);
      const saida = new Date(`1970-01-01T${horaSaida.toLocaleTimeString()}`);

      const diffMs = saida - entrada;

      const totalMs = diffMs >= 0 ? diffMs : diffMs + 24 * 60 * 60 * 1000;

      const horasTrabalhadas = (totalMs - 30 * 60 * 1000) / (1000 * 60 * 60);
      return horasTrabalhadas.toFixed(2) + 'h';
    }
    return '0h';
  };

  const handleRegister = () => {
    const registrosPonto = JSON.parse(localStorage.getItem('RegistroPonto')) || [];

    const novoRegistro = {
      idRegistroPonto: registrosPonto.length + 1,
      idFuncionario: JSON.parse(localStorage.getItem('usuarioLogado')).idFuncionario,
      dataPonto: diaTrabalhado?.toISOString().split('T')[0],
      horaEntrada: horaEntrada?.toLocaleTimeString(),
      horaSaida: horaSaida?.toLocaleTimeString(),
      tempoRefeicao: '30m',
      horasTotais: calcularHorasTotais()
    };

    registrosPonto.push(novoRegistro);
    localStorage.setItem('RegistroPonto', JSON.stringify(registrosPonto));
    navigate('/home');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="root-ponto">
        <Paper elevation={3} className='paper-ponto'>
          <Typography sx={{ marginBottom: '50px', fontWeight: '700' }} variant="h4" align="center">
            Registrar Ponto
          </Typography>

          <div className='div-input'>
            <DatePicker
              label="Dia Trabalhado"
              value={diaTrabalhado}
              onChange={(newValue) => setDiaTrabalhado(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <TimePicker
              label="Hora Entrada"
              value={horaEntrada}
              onChange={(newValue) => setHoraEntrada(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              sx={{marginTop: '20px'}}
            />
            <TimePicker
              label="Hora Saída"
              value={horaSaida}
              onChange={(newValue) => setHoraSaida(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              sx={{marginTop: '20px'}}
            />
          </div>

          <div className='btn-class'>
            <Button variant="contained" color="primary" className='btn-cancel' onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className='btn-register' onClick={handleRegister}>
              Registrar
            </Button>
          </div>
        </Paper>
      </div>
    </LocalizationProvider>
  );
};

export default RegistrarPonto;
