import React, { useState, useEffect } from 'react';
import { Paper, Typography, Select, MenuItem, FormControl, InputLabel, Box, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/DadosFinanceiros.css';

function DadosFinanceiros() {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [salaryInfo, setSalaryInfo] = useState(null);

    const users = JSON.parse(localStorage.getItem('Funcionario')) || [];
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        fetchSalaryData(event.target.value, selectedMonth);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        fetchSalaryData(selectedUser, event.target.value);
    };

    const fetchSalaryData = (userId, month) => {
        if (userId && month) {
            const funcionario = users.find(user => user.idFuncionario === parseInt(userId));
            const registrosPonto = JSON.parse(localStorage.getItem('RegistroPonto')) || [];

            const registrosDoMes = registrosPonto.filter(registro => {
                const dataPonto = new Date(registro.dataPonto);
                return registro.idFuncionario === parseInt(userId) && dataPonto.getMonth() === months.indexOf(month);
            });

            const totalHoras = registrosDoMes.reduce((total, registro) => {
                const entrada = new Date(`1970-01-01T${registro.horaEntrada}`);
                const saida = new Date(`1970-01-01T${registro.horaSaida}`);
                const diff = (saida - entrada - 30 * 60 * 1000) / 3600000;
                return total + diff;
            }, 0);

            const salarioHora = funcionario.salarioHora;
            const proventos = totalHoras * salarioHora;
            const inss = proventos * 0.08;
            const valeRefeicao = registrosDoMes.length * 100;

            const descontos = {
                inss,
                valeRefeicao
            };

            const valorLiquido = proventos - inss - valeRefeicao;

            setSalaryInfo({
                valorLiquido,
                proventos,
                horasNormais: totalHoras,
                horasRepouso: 20,
                descontos
            });
        }
    };

    useEffect(() => {
        if (selectedUser && selectedMonth) {
            fetchSalaryData(selectedUser, selectedMonth);
        }
    }, [selectedUser, selectedMonth]);

    return (
        <div className="root-financeiro">
            <Paper elevation={3} className="paper-financeiro">
                <Typography sx={{ marginBottom: '50px', fontWeight: '700' }} variant="h4" align="center">
                    Dados Financeiros
                </Typography>

                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Usuário</InputLabel>
                            <Select
                                value={selectedUser}
                                onChange={handleUserChange}
                                label="Usuário"
                            >
                                {users.map(user => (
                                    <MenuItem key={user.idFuncionario} value={user.idFuncionario}>
                                        {user.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Mês</InputLabel>
                            <Select
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                label="Mês"
                            >
                                {months.map((month, index) => (
                                    <MenuItem key={index} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {salaryInfo && (
                    <div className="div-info-salario">
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>Informações Salariais</Typography>
                            <Typography sx={{ marginTop: '20px' }}>Valor a receber líquido: R$ {salaryInfo.valorLiquido}</Typography>
                            <Typography>Proventos: R$ {salaryInfo.proventos}</Typography>
                            <Typography>Horas Normais: {salaryInfo.horasNormais}</Typography>
                            <Typography>Horas de Repouso: {salaryInfo.horasRepouso}</Typography>
                            <Typography sx={{ fontWeight: 700, marginTop: '20px' }}>Descontos:</Typography>
                            <Typography> - INSS: R$ {salaryInfo.descontos.inss}</Typography>
                            <Typography> - Vale Refeição: R$ {salaryInfo.descontos.valeRefeicao}</Typography>
                        </Box>
                    </div>
                )}

                <div className="btn-class">
                    <Button variant="contained" color="primary" className="btn-cancel" onClick={() => navigate(-1)}>
                        Voltar
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default DadosFinanceiros;
