import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import axios from 'axios';
import { BASEURL, TOKEN } from '../../../../variables';

export default function CadProduct({ title, getProducts }) {
    const [open, setOpen] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [image, setImage] = React.useState(null);

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
        try {
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('img', image);

            const resp = await axios.post(`${BASEURL}/products`, formData, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Produto salvo com sucesso', resp);
            getProducts();
        } catch (error) {
            console.log('Erro ao salvar produto', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button className='btn-primary' variant="contained" onClick={handleClickOpen}>
                Cadastrar um novo produto
            </Button>
            <Dialog
                open={open}
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
                                    required
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button className='btn-secondary' onClick={handleClose}>Cancelar</Button>
                    <Button className='btn-primary' variant="contained" onClick={() => { saveProduct(); clearCampos(); handleClose(); }} autoFocus>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
