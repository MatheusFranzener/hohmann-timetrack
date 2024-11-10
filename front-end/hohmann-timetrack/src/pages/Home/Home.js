import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalConfirmacao from '../../components/ModalConfirmacao/ModalConfirmacao';
import '../../styles/Home.css';

function Home() {
    const [records, setRecords] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const registrosPonto = JSON.parse(localStorage.getItem('RegistroPonto')) || [];
        const listaFuncionarios = JSON.parse(localStorage.getItem('Funcionario')) || [];

        setFuncionarios(listaFuncionarios);

        if (usuarioLogado && usuarioLogado.isAdmin) {
            setRecords(registrosPonto);
        } else if (usuarioLogado) {
            const registrosFiltrados = registrosPonto.filter(
                (registro) => registro.idFuncionario === usuarioLogado.idFuncionario
            );
            setRecords(registrosFiltrados);
        }
    }, []);

    const getNomeFuncionario = (idFuncionario) => {
        const funcionario = funcionarios.find((f) => f.idFuncionario === idFuncionario);
        return funcionario ? funcionario.nome : 'Funcionário não encontrado';
    };

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirmDelete = () => {
        const registrosAtualizados = records.filter(
            (record) => !selected.includes(record.idRegistroPonto)
        );
        setRecords(registrosAtualizados);
        setSelected([]);
        setOpenConfirmDialog(false);

        localStorage.setItem('RegistroPonto', JSON.stringify(registrosAtualizados));
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(records.map((record) => record.idRegistroPonto));
        } else {
            setSelected([]);
        }
    };

    const handleSelect = (id) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((selectedId) => selectedId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleEdit = () => {
        if (selected.length === 1) {
            navigate(`/editar-ponto/${selected[0]}`);
        }
    };

    const handleRegister = () => {
        navigate('/registrar-ponto');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="home-container">
            <div className="home-buttons">
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpenConfirmDialog}
                    disabled={selected.length === 0}
                >
                    Remover Ponto
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    disabled={selected.length !== 1}
                >
                    Editar Ponto
                </Button>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#A3E7A9' }}
                    onClick={handleRegister}
                >
                    Registrar Ponto
                </Button>
            </div>

            <TableContainer component={Paper} className="home-table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < records.length}
                                    checked={selected.length === records.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>Funcionario</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Hora Entrada</TableCell>
                            <TableCell>Refeição</TableCell>
                            <TableCell>Hora Saída</TableCell>
                            <TableCell>Horas Totais</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
                            <TableRow key={record.idRegistroPonto} selected={selected.includes(record.idRegistroPonto)}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.includes(record.idRegistroPonto)}
                                        onChange={() => handleSelect(record.idRegistroPonto)}
                                    />
                                </TableCell>
                                <TableCell>{getNomeFuncionario(record.idFuncionario)}</TableCell>
                                <TableCell>{record.dataPonto}</TableCell>
                                <TableCell>{record.horaEntrada}</TableCell>
                                <TableCell>{record.tempoRefeicao}</TableCell>
                                <TableCell>{record.horaSaida}</TableCell>
                                <TableCell>{record.horasTotais}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={records.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <ModalConfirmacao
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                onConfirm={handleConfirmDelete}
                message={`Tem certeza de que deseja excluir ${selected.length > 1 ? 'os registros selecionados?' : 'o registro selecionado?'}`}
            />
        </div>
    );
}

export default Home;