import React, { useState } from 'react';
import PerfilEdit from '../../components/Perfil/PerfilEdit/PerfilEdit';
import PerfilView from '../../components/Perfil/PerfilView/PerfilView';

const Perfil = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [perfilData, setPerfilData] = useState({
        nomeCompleto: 'João da Silva Pereira',
        email: 'joao_silva@gmail.com',
        sexo: 'Masculino',
        dataNascimento: '17/07/2000',
        celular: '(47) 9 9128-4989',
        endereco: 'Rua dos Anjos, 201',
        cidade: 'Jaraguá do Sul',
        estado: 'Santa Catarina',
        cep: '89253-300',
        salarioHora: '17.50',
        cargo: 'Costureira',
        senha: '1234',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (updatedData) => {
        setPerfilData(updatedData);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

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