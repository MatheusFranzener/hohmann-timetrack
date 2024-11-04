import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Paper, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Ponto.css';

const EditarPonto = () => {
  const navigate = useNavigate();

  const [diaTrabalhado, setDiaTrabalhado] = useState(null);
  const [horaEntrada, setHoraEntrada] = useState(null);
  const [horaSaida, setHoraSaida] = useState(null);

  const handleEdit = () => {
  };

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
                <p>Dia: 20/09/2024</p>
                <p>Hora Entrada: 5:30</p>
                <p>Hora Saída: 13:00</p>
                <p>Horas Totais: 8h</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className='div-input-edit'>
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
                  sx={{ marginTop: '20px' }}
                />
                <TimePicker
                  label="Hora Saída"
                  value={horaSaida}
                  onChange={(newValue) => setHoraSaida(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  sx={{ marginTop: '20px' }}
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