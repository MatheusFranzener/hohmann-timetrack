import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/Ponto.css';

const EditarPonto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [registro, setRegistro] = useState(null);

  useEffect(() => {
    const registrosPonto = JSON.parse(localStorage.getItem('RegistroPonto')) || [];
    const registroExistente = registrosPonto.find((registro) => registro.idRegistroPonto === parseInt(id));
    setRegistro(registroExistente);
  }, [id]);

  const calcularHorasTotais = (horaEntrada, horaSaida) => {
    if (horaEntrada && horaSaida) {
      const entrada = new Date(`1970-01-01T${horaEntrada}`);
      const saida = new Date(`1970-01-01T${horaSaida}`);

      const diffMs = saida - entrada;

      const totalMs = diffMs >= 0 ? diffMs : diffMs + 24 * 60 * 60 * 1000;

      const horasTrabalhadas = (totalMs - 30 * 60 * 1000) / (1000 * 60 * 60);
      console.log('hroas trabalhadas>: ', horasTrabalhadas);
      return horasTrabalhadas.toFixed(2) + 'h';
    }
    return '0h';
  };

  const handleEdit = () => {
    const registrosPonto = JSON.parse(localStorage.getItem('RegistroPonto')) || [];
    const registroIndex = registrosPonto.findIndex((r) => r.idRegistroPonto === parseInt(id));

    const horasTotais = calcularHorasTotais(registro.horaEntrada, registro.horaSaida);
    registrosPonto[registroIndex] = { ...registro, horasTotais };

    localStorage.setItem('RegistroPonto', JSON.stringify(registrosPonto));
    navigate('/home');
  };

  if (!registro) return <p>Carregando...</p>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='root-ponto'>
        <Paper elevation={3} className='paper-ponto'>
          <Typography sx={{ marginBottom: '50px', fontWeight: '700' }} variant="h4" align="center">
            Editar Ponto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper className="info-box">
                <h3>Informações</h3>
                <p>Dia: {registro.dataPonto}</p>
                <p>Hora Entrada: {registro.horaEntrada}</p>
                <p>Hora Saída: {registro.horaSaida}</p>
                <p>Horas Totais: {registro.horasTotais}</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className='div-input-edit'>
                <DatePicker
                  label="Dia Trabalhado"
                  value={registro.dataPonto ? new Date(registro.dataPonto) : null}
                  onChange={(newValue) => setRegistro({ ...registro, dataPonto: newValue.toISOString().split('T')[0] })}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <TimePicker
                  label="Hora Entrada"
                  value={registro.horaEntrada ? new Date(`1970-01-01T${registro.horaEntrada}`) : null}
                  onChange={(newValue) => {
                    const novaHoraEntrada = newValue.toLocaleTimeString();
                    setRegistro({ ...registro, horaEntrada: novaHoraEntrada, horasTotais: calcularHorasTotais(novaHoraEntrada, registro.horaSaida) });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <TimePicker
                  label="Hora Saída"
                  value={registro.horaSaida ? new Date(`1970-01-01T${registro.horaSaida}`) : null}
                  onChange={(newValue) => {
                    const novaHoraSaida = newValue.toLocaleTimeString();
                    setRegistro({ ...registro, horaSaida: novaHoraSaida, horasTotais: calcularHorasTotais(registro.horaEntrada, novaHoraSaida) });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </div>
            </Grid>
          </Grid>
          <div className='btn-class'>
            <Button variant="contained" color="primary" className='btn-cancel' onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" className='btn-register' onClick={handleEdit}>
              Salvar Alterações
            </Button>
          </div>
        </Paper>
      </div>
    </LocalizationProvider>
  );
};

export default EditarPonto;
