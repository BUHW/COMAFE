import React, { useState } from 'react';
import './Card.css';
import LongMenu from '../dialog/DotMenu';
import CadProduct from '../dialog/CadProduct';
import axios from 'axios';
import { BASEURL, TOKEN } from '../../../../variables';
import { Grid, Paper, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export function Card({ data, getProducts }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const itemsPerPage = isMobile ? 1 : isTablet ? 3 : 5;
  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
  const [productToEdit, setProductToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const maxSteps = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const options = [
    'Editar',
    'Excluir',
    'Detalhes'
  ];

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
      setAlert({ show: true, severity: 'error', message: "Erro ao apagar produto" });
    }
  }

  const handleClose = () => {
    setAlert({ ...alert, show: false });
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  return (
    <>
      <div className='card-cadproduct'>
        <Button className='btn-primary' variant="contained" onClick={() => setIsModalOpen(true)}>
          Cadastrar um novo produto
        </Button>
        <CadProduct
          title={productToEdit ? "Editar Produto" : "Cadastrar Produto"}
          getProducts={getProducts}
          productToEdit={productToEdit}
          isOpen={isModalOpen}
          handleClose={handleModalClose}
        />
      </div>
      <Grid container spacing={2} className="card-container">
        {data.slice(activeStep * itemsPerPage, activeStep * itemsPerPage + itemsPerPage).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper className="card">
              <div className="image-container">
                <img src={`../../../../comafe-api/src/main/resources/static/img/img-produtos/${item.imgName}`} alt={item.imgUrl} />
                <div className="menu-overlay">
                  <LongMenu options={options} handleDelete={() => onHandleDelete(item.id)} handleEdit={() => handleEdit(item)} />
                </div>
              </div>
              <div className='card-content'>
                <h2>{item.title}</h2>
                <h4>{item.description}</h4>
                <p>Valor: <strong>{item.price}</strong></p>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1, margin: '0 auto' }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
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
