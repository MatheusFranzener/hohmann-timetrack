import React from 'react';
import RegistrarPonto from '../../Componentes/Ponto/RegistrarPonto';
import EditarPonto from '../../Componentes/Ponto/EditarPonto';

const Ponto = () => {
  const modoEdicao = false;

  return (
    <div>
      {modoEdicao ? <EditarPonto /> : <RegistrarPonto />}
    </div>
  );
};

export default Ponto;