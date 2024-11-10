import React from 'react';
import { Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Perfil.css';

const PerfilView = ({ perfilData, onEdit }) => {
    const navigate = useNavigate();

    return (
        <div className='root-perfil'>
            <Paper elevation={3} className='paper-perfil'>
                <Typography variant="h4" align="center" className="perfil-heading">
                    Perfil
                </Typography>

                <Grid container spacing={3} className="perfil-details">
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Nome Completo:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.nome}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Email:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Sexo:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.sexo}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Data de nascimento:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.dataNascimento}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Celular:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.celular}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Endereço:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.endereco}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Cidade:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.cidade}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Estado:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.estado}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">CEP:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.cep}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Salário Hora:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.salarioHora}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Cargo:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.cargo}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: '700' }} variant="body1">Senha:</Typography>
                        <Typography sx={{ padding: '6px' }} variant="body2">{perfilData.senha}</Typography>
                    </Grid>
                </Grid>

                <div className='div-btn'>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(-1)}
                        className='perfil-cancel-button'
                    >
                        Voltar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onEdit}
                        className='perfil-edit-button'
                    >
                        Editar Perfil
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default PerfilView;