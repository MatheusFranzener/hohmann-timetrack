import React, { useState } from 'react';
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
    const mockData = [
        { id: 1, funcionario: 'Matheus Hohmann', data: '2024-10-10', horaEntrada: '08:00', refeicao: '12:00', horaSaida: '17:00', horasTotais: '8h' },
        { id: 2, funcionario: 'João Silva', data: '2024-10-11', horaEntrada: '08:15', refeicao: '12:15', horaSaida: '17:15', horasTotais: '8h' },
        { id: 3, funcionario: 'Matheus Hohmann', data: '2024-10-10', horaEntrada: '08:00', refeicao: '12:00', horaSaida: '17:00', horasTotais: '8h' },
        { id: 4, funcionario: 'João Silva', data: '2024-10-11', horaEntrada: '08:15', refeicao: '12:15', horaSaida: '17:15', horasTotais: '8h' },
        { id: 5, funcionario: 'Matheus Hohmann', data: '2024-10-10', horaEntrada: '08:00', refeicao: '12:00', horaSaida: '17:00', horasTotais: '8h' },
        { id: 6, funcionario: 'João Silva', data: '2024-10-11', horaEntrada: '08:15', refeicao: '12:15', horaSaida: '17:15', horasTotais: '8h' },
        { id: 7, funcionario: 'Matheus Hohmann', data: '2024-10-10', horaEntrada: '08:00', refeicao: '12:00', horaSaida: '17:00', horasTotais: '8h' },
        { id: 8, funcionario: 'João Silva', data: '2024-10-11', horaEntrada: '08:15', refeicao: '12:15', horaSaida: '17:15', horasTotais: '8h' },
        { id: 9, funcionario: 'Matheus Hohmann', data: '2024-10-10', horaEntrada: '08:00', refeicao: '12:00', horaSaida: '17:00', horasTotais: '8h' },
        { id: 10, funcionario: 'João Silva', data: '2024-10-11', horaEntrada: '08:15', refeicao: '12:15', horaSaida: '17:15', horasTotais: '8h' },
        { id: 11, funcionario: 'Matheus Hohmann', data: '2024-10-10', horaEntrada: '08:00', refeicao: '12:00', horaSaida: '17:00', horasTotais: '8h' },
        { id: 12, funcionario: 'João Silva', data: '2024-10-11', horaEntrada: '08:15', refeicao: '12:15', horaSaida: '17:15', horasTotais: '8h' },
    ];

    const [records, setRecords] = useState(mockData);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    
    const navigate = useNavigate();

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirmDelete = () => {
        setRecords(records.filter((record) => !selected.includes(record.id)));
        setSelected([]);
        setOpenConfirmDialog(false);
    };

    const handleSelect = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
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
                                    checked={records.length > 0 && selected.length === records.length}
                                    onChange={(event) => setSelected(event.target.checked ? records.map((r) => r.id) : [])}
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
                            <TableRow key={record.id} selected={selected.includes(record.id)}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selected.includes(record.id)}
                                        onChange={() => handleSelect(record.id)}
                                    />
                                </TableCell>
                                <TableCell>{record.funcionario}</TableCell>
                                <TableCell>{record.data}</TableCell>
                                <TableCell>{record.horaEntrada}</TableCell>
                                <TableCell>{record.refeicao}</TableCell>
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