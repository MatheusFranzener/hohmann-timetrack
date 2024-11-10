import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Box, TextField, Grid, Paper } from '@mui/material';
import '../../../styles/Perfil.css';

const PerfilEdit = ({ perfilData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(perfilData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className="root-perfil">
            <Paper elevation={3} className='paper-perfil'>
                <Typography variant="h4" align="center" className="perfil-heading">
                    Editar Perfil
                </Typography>

                <Grid container spacing={3} className="perfil-details">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nome"
                            name="nome"
                            variant="outlined"
                            fullWidth
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Sexo"
                            name="sexo"
                            variant="outlined"
                            fullWidth
                            value={formData.sexo}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Data de Nascimento"
                            name="dataNascimento"
                            variant="outlined"
                            fullWidth
                            value={formData.dataNascimento}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Celular"
                            name="celular"
                            variant="outlined"
                            fullWidth
                            value={formData.celular}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Endereço"
                            name="endereco"
                            variant="outlined"
                            fullWidth
                            value={formData.endereco}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Cidade"
                            name="cidade"
                            variant="outlined"
                            fullWidth
                            value={formData.cidade}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Estado"
                            name="estado"
                            variant="outlined"
                            fullWidth
                            value={formData.estado}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CEP"
                            name="cep"
                            variant="outlined"
                            fullWidth
                            value={formData.cep}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Salário Hora"
                            name="salarioHora"
                            variant="outlined"
                            fullWidth
                            disabled={!formData.isAdmin}
                            value={formData.salarioHora}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Cargo"
                            name="cargo"
                            variant="outlined"
                            fullWidth
                            disabled={!formData.isAdmin}
                            value={formData.cargo}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Senha"
                            name="senha"
                            variant="outlined"
                            fullWidth
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <div className='div-btn'>
                    <Button variant="contained" className="perfil-cancel-button" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" className="perfil-edit-button" onClick={handleSave}>
                        Salvar
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default PerfilEdit;