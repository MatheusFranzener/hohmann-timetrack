import React from 'react';
import { TextField, Grid, RadioGroup, FormControlLabel, Radio, Button, Typography, Paper } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import '../../styles/CadastroFuncionario.css';

const CadastroFuncionario = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = React.useState(null);
    const handleDateChange = (date) => setSelectedDate(date);

    return (
        <div className='root-cadastro'>
            <Paper elevation={3} className='paper'>
                <Typography sx={{ marginBottom: '50px', fontWeight: '700' }} variant="h4" align="center">
                    Cadastrar Funcionário
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nome Completo" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="E-mail" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Data de Nascimento"
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Naturalidade" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Celular" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Telefone" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Endereço" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Cidade" fullWidth />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '30px' }}>
                        <Typography variant="body1">Sexo</Typography>
                        <RadioGroup row>
                            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                            <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                            <FormControlLabel value="outro" control={<Radio />} label="Outro" />
                        </RadioGroup>
                    </Grid>
                    <div className='div-btn-cadastro'>
                        <Button variant="contained" color="primary" className='cancel-button' onClick={() => navigate(-1)}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" className='confirm-button'>
                            Cadastrar
                        </Button>
                    </div>
                </Grid>
            </Paper>
        </div>
    );
};

export default CadastroFuncionario;