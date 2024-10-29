import React from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Link, Box } from '@mui/material';
import '../../styles/Login.css';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        onLogin();
        navigate('/home');
    };

    return (
        <div>
            <div className="root">
                <Card className="card">
                    <CardContent>
                        <Typography variant="h5" className="title">
                            Faça seu Login
                        </Typography>
                        <form className="form">
                            <TextField
                                label="Usuário"
                                variant="outlined"
                                fullWidth
                                className="text-field"
                            />
                            <TextField
                                label="Senha"
                                type="password"
                                variant="outlined"
                                fullWidth
                                className="text-field"
                            />
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
                                sx={{  color: '#333', backgroundColor: '#A3E7A9' }}
                            >
                                Entrar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
};

export default Login;