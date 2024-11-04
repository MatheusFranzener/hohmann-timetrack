import React from 'react';
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