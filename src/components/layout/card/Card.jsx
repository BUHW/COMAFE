import React, { useState } from 'react';
import './Card.css';
import LongMenu from '../dialog/DotMenu';
import CadProduct from '../dialog/CadProduct';
import axios from 'axios';
import { BASEURL, TOKEN } from '../../../../variables'
import { Alert, Snackbar } from '@mui/material';
 
export function Card({ data, getProducts }) {

  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

  const options = [
    'Editar',
    'Excluir',
    'Detalhes'
  ]

  async function onHandleDelete(id) {
    try {
      await axios.delete(`${BASEURL}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      getProducts();
      setAlert({ show: true, severity: 'success', message: "Produto apagado com sucesso" });
    } catch (error) {
      console.log('Erro ao deletar produto', error);
    }
  }

  const handleClose = () => {
    setAlert({ ...alert, show: false });
  };

  function teste() {
    data.map((item) => {
      console.log(item.imgUrl);
    })
  }

  return (
    <>
      <div className='card-cadproduct'>
        <CadProduct title="Cadastrar Produto" getProducts={getProducts} />
      </div>
      <div className="card-container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <div className="image-container">
              <img src={`../../../../comafe-api/src/main/resources/static/img/img-produtos/${item.imgName}`} alt={item.imgUrl} />
              <div className="menu-overlay">
                <LongMenu options={options} handleDelete={() => onHandleDelete(item.id)} />
              </div>
            </div>
            <div className='card-content'>
              <h2>{item.title}</h2>
              <h4>{item.description}</h4>
              <p>Valor: <strong>{item.price} R$</strong></p>
              <button onClick={teste}>oi</button>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        open={alert.show}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

    </>

  );
}