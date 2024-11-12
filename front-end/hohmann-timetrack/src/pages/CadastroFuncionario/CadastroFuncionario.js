import React, { useState } from 'react';
import { TextField, Grid, RadioGroup, FormControlLabel, Radio, Button, Typography, Paper } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import '../../styles/CadastroFuncionario.css';

const CadastroFuncionario = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        dataNascimento: null,
        cargo: '',
        celular: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        senha: '',
        sexo: 'masculino',
        isAdmin: false,
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({ ...formData, dataNascimento: date });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdminChange = (e) => {
        setFormData({ ...formData, isAdmin: e.target.value === 'true' });
    };

    const handleCadastro = () => {
        const funcionarios = JSON.parse(localStorage.getItem('Funcionario')) || [];

        const novoFuncionario = {
            idFuncionario: funcionarios.length + 1,
            ...formData,
            dataNascimento: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
            salarioHora: 13,
        };

        funcionarios.push(novoFuncionario);
        localStorage.setItem('Funcionario', JSON.stringify(funcionarios));

        navigate('/home');
    };

    return (
        <div className='root-cadastro'>
            <Paper elevation={3} className='paper-cadastro'>
                <Typography sx={{ marginBottom: '50px', fontWeight: '700' }} variant="h4" align="center">
                    Cadastrar Funcionário
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nome Completo" name="nome" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="E-mail" name="email" fullWidth onChange={handleChange} />
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
                        <TextField label="Cargo" name="cargo" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Celular" name="celular" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Endereço" name="endereco" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Cidade" name="cidade" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Estado" name="estado" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="CEP" name="cep" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Senha" name="senha" fullWidth onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '30px' }}>
                        <Typography variant="body1">Sexo</Typography>
                        <RadioGroup row name="sexo" value={formData.sexo} onChange={handleChange}>
                            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                            <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                            <FormControlLabel value="outro" control={<Radio />} label="Outro" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginTop: '30px' }}>
                        <Typography variant="body1">Usuário Admin</Typography>
                        <RadioGroup row value={String(formData.isAdmin)} onChange={handleAdminChange}>
                            <FormControlLabel value="true" control={<Radio />} label="Sim" />
                            <FormControlLabel value="false" control={<Radio />} label="Não" />
                        </RadioGroup>
                    </Grid>
                    
                    <div className='div-btn-cadastro'>
                        <Button variant="contained" color="primary" className='cancel-button' onClick={() => navigate(-1)}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" className='confirm-button' onClick={handleCadastro}>
                            Cadastrar
                        </Button>
                    </div>
                </Grid>
            </Paper>
        </div>
    );
};

export default CadastroFuncionario;