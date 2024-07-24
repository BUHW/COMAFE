import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import './DialogContact.css';

export default function ScrollDialog({ open, handleClose }) {
    const [scroll, setScroll] = React.useState('paper');
    const [contact, setContact] = React.useState([]);

    const handleContact = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setContact({
            ...contact,
            [name]: value
        });
    }

    const submit = (e) => {
        e.preventDefault();
        console.log({
            nome: contact.nome,
            telefone: contact.telefone,
            email: contact.email,
            mensagem: contact.mensagem
        })
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Contato</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    <form className='form-ctt'>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Nome"
                                    name='nome'
                                    variant="standard"
                                    fullWidth
                                    required
                                    value={contact.nome}
                                    onChange={handleContact}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Telefone"
                                    name='telefone'
                                    variant="standard"
                                    fullWidth
                                    required
                                    value={contact.telefone}
                                    onChange={handleContact}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="E-mail"
                                    name='email'
                                    type='email'
                                    variant="standard"
                                    fullWidth
                                    required
                                    value={contact.email}
                                    onChange={handleContact}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-data">
                                <TextField
                                    label="Mensagem"
                                    name='mensagem'
                                    variant="standard"
                                    rows={4}
                                    fullWidth
                                    required
                                    value={contact.mensagem}
                                    onChange={handleContact}
                                />
                            </div>
                        </div>
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={submit}>Enviar</Button>
            </DialogActions>
        </Dialog>
    );
}
