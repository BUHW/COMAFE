import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import { BASEURL, TOKEN } from '../../../../variables';

const mascaraMoeda = (event) => {
    const onlyDigits = event.target.value
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
}

const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(valor)
}

export default function CadProduct({ title, getProducts, productToEdit, isOpen, handleClose }) {
    const [product, setProduct] = React.useState(productToEdit || {});
    const [image, setImage] = React.useState(null);
    const [alert, setAlert] = React.useState({ show: false, severity: '', message: '' });

    React.useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct({});
        }
    }, [productToEdit]);

    const handleProduct = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const clearCampos = () => {
        setProduct({});
        setImage(null);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const saveProduct = async () => {
        if (!product.title || !product.description || !product.price || (!image && !product.imgName)) {
            setAlert({ show: true, severity: 'error', message: "Todos os campos são obrigatórios" });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('price', product.price);
            if (image) {
                formData.append('img', image);
            }

            const url = product.id ? `${BASEURL}/products/${product.id}` : `${BASEURL}/products`;
            const method = product.id ? 'put' : 'post';

            await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setAlert({ show: true, severity: 'success', message: product.id ? "Produto atualizado com sucesso" : "Produto adicionado com sucesso" });
            getProducts();
            clearCampos();
            handleClose();
        } catch (error) {
            setAlert({ show: true, severity: 'error', message: "Erro inesperado, por favor tente mais tarde" });
        }
    };

    function handleFechar() {
        setAlert({ ...alert, show: false });
    }

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <form className='form-ctt'>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Titulo"
                                    name='title'
                                    variant="standard"
                                    fullWidth
                                    required
                                    value={product.title || ''}
                                    onChange={handleProduct}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Descrição"
                                    name='description'
                                    variant="standard"
                                    fullWidth
                                    required
                                    value={product.description || ''}
                                    onChange={handleProduct}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Valor"
                                    name='price'
                                    variant="standard"
                                    fullWidth
                                    required
                                    value={product.price || ''}
                                    onChange={handleProduct}
                                    onInput={mascaraMoeda}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Foto"
                                    name='img'
                                    variant="standard"
                                    type='file'
                                    fullWidth
                                    onChange={handleImageChange}
                                    required={!product.imgName}
                                />
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button className='btn-secondary' onClick={handleClose}>Cancelar</Button>
                    <Button className='btn-primary' variant="contained" onClick={saveProduct} autoFocus>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alert.show}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleFechar} severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
