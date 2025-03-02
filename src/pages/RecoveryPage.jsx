import React, { useState } from 'react'; 
import logo from '../assets/Logo-CuBisne.png';
import { TextField, Button, Box, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { passwordEmail } from '../services/authService';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

export default function RecoveryPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = (data) => { 
        console.log('Recovery:', data);
        setIsLoading(true);
        passwordEmail(data).then(response => {
            setIsLoading(false);
            toast.success('Genial!! Se ha enviado un correo electrónico');
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
            toast.error('Error al enviar el correo electrónico');
        });  
    }

    return <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Card variant="outlined" style={{ textAlign: 'center', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                Recuperar Contrase&ntilde;a
                </Typography>
                <img src={logo} alt="Logo" style={{ width: '150px' }} />
                <p>Introduce su email, le enviaremos un correo con acceso para cambiar la contrase&ntilde;a</p>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                        <TextField
                            label="Email"
                            type='email'
                            fullWidth
                            { ...register('email', { required: 'El correo es requerido' }) }
                        />
                        { errors.email && <span style={{ color: 'red' }}>{ errors.email.message }</span> }
                        </Grid>
                        <Grid size={12}>
                        <Button type="submit" disabled={isLoading} variant="contained" color="primary" fullWidth>
                            {
                                isLoading === true ? 
                                <div style={{ paddingRight: '5px' }} >
                                    <Oval height="20" width="20" color="white" strokeWidth={8} ariaLabel="loading" />
                                </div> : null
                            }
                            Enviar Correo
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
                <p>¿Ya tiene cuenta? <Link to="/login">Iniciar Sesi&oacute;n</Link></p>
            </CardContent>
        </Card>
      </Box>
    </Container>;
}
