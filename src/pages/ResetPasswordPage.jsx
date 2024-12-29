import React, { useState } from 'react'; 
import logo from '../assets/Logo-CuBisne.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { passwordReset } from '../services/authService';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

export default function ResetPasswordPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);

    const onSubmit = (data) => { 
        // Aquí va la lógica de autenticación 
        console.log(location);
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const email = params.get('email');
        data = { ...data, token: token, email: email };
        console.log('Recovery:', data); 
        setIsLoading(true);
        passwordReset(data).then(response => {
            toast.success('Genial!! Se ha modificado la contraseña correctamente');
            setIsLoading(false);
            navigate('/login');
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
            toast.error('Error al cambiar la contraseña');
        });
    }

    return <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Card variant="outlined" style={{ textAlign: 'center', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                Iniciar Sesi&oacute;n
                </Typography>
                <img src={logo} alt="Logo" style={{ width: '150px' }} />
                <p>Introduce la nueva contrase&ntilde;a</p>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                        <TextField
                            label="Contraseña"
                            type='password'
                            fullWidth
                            { ...register('password', { required: 'La contraseña es requerida' }) }
                        />
                        { errors.password && <span style={{ color: 'red' }}>{ errors.password.message }</span> }
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Confirmar Contraseña"
                            type="password"
                            fullWidth
                            { ...register('password_confirmation', { required: 'La confirmación de contraseña es requerida' }) }
                        />
                        { errors.password_confirm && <span style={{ color: 'red' }}>{ errors.password_confirm.message }</span> }
                        </Grid>
                        <Grid size={12}>
                        <Button type="submit" disabled={isLoading} variant="contained" color="primary" fullWidth>
                            {
                                isLoading === true ? 
                                <div style={{ paddingRight: '5px' }} >
                                    <Oval height="20" width="20" color="white" strokeWidth={8} ariaLabel="loading" />
                                </div> : null
                            }
                            Cambiar Contrase&ntilde;a
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
