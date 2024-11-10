import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Link, Box } from '@mui/material';
import '../../styles/Login.css';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = () => {
        const funcionarios = JSON.parse(localStorage.getItem('Funcionario')) || [];

        const usuario = funcionarios.find(
            (func) => func.email === email && func.senha === senha
        );

        if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            onLogin();
            navigate('/home');
        } else {
            setError('Usuário ou senha incorretos!');
        }
    };

    return (
        <div className="root-login">
            <Card className="card">
                <CardContent>
                    <Typography sx={{ marginBottom: '50px', fontWeight: '700' }} variant="h4" align="center">
                        Faça seu Login
                    </Typography>
                    <form className="form">
                        <TextField
                            label="Usuário"
                            variant="outlined"
                            fullWidth
                            className="text-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            className="text-field"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2" align="center" sx={{ marginTop: '10px' }}>
                                {error}
                            </Typography>
                        )}
                        <Box className="forgot-password">
                            <Link href="#" underline="none">
                                Esqueci a minha Senha
                            </Link>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            className="button"
                            onClick={handleLoginClick}
                            sx={{ color: '#333', backgroundColor: '#A3E7A9' }}
                        >
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
