import React, { useState, useEffect } from 'react';
import PerfilEdit from '../../components/Perfil/PerfilEdit/PerfilEdit';
import PerfilView from '../../components/Perfil/PerfilView/PerfilView';

const Perfil = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [perfilData, setPerfilData] = useState(null);

    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuarioLogado) {
            setPerfilData(usuarioLogado);
        }
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (updatedData) => {
        setPerfilData(updatedData);
        setIsEditing(false);

        localStorage.setItem('usuarioLogado', JSON.stringify(updatedData));

        const funcionarios = JSON.parse(localStorage.getItem('Funcionario')) || [];
        const index = funcionarios.findIndex(func => func.idFuncionario === updatedData.idFuncionario);
        if (index !== -1) {
            funcionarios[index] = updatedData;
            localStorage.setItem('Funcionario', JSON.stringify(funcionarios));
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    if (!perfilData) {
        return null;
    }

    return (
        <>
            {isEditing ? (
                <PerfilEdit perfilData={perfilData} onSave={handleSaveClick} onCancel={handleCancelClick} />
            ) : (
                <PerfilView perfilData={perfilData} onEdit={handleEditClick} />
            )}
        </>
    );
};

export default Perfil;