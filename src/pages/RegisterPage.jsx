import React, { useState, useEffect } from 'react'; 
import logo from '../assets/Logo-CuBisne.png';
import { TextField, Button, Box, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/authService';
import { registerUserReducer } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

export default function RegisterPage() {

    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {  
        // Aquí va la lógica de registro
        console.log('Register:', data); 
        setIsLoading(true);
        registerUser(data).then((response) => {
            setIsLoading(false);
            const { access_token } = response.data.data;
            localStorage.setItem('access_token_cubisne', access_token);
            dispatch(registerUserReducer(response.data));
            toast.success(`Genial!! Se ha registrado satisfacoriamente`);
            navigate('/');
        }).catch((error => {
            setIsLoading(false);
            toast.error(`Error: ${error.response.data.message}`);
        }));
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault();
    }

    return <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Card variant="outlined" style={{ textAlign: 'center', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                Registrarse
                </Typography>
                <img src={logo} alt="Logo" style={{ width: '150px' }} />
                <p>Introduzca sus datos para registrarse en la plataforma</p>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            {...register('name', { required: 'El nombre es requerido' })}
                        />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Apellidos"
                            fullWidth
                            {...register('lastname', { required: 'Los apellidos son requeridos' })}
                        />
                        {errors.lastname && <span style={{ color: 'red' }}>{errors.lastname.message}</span>}
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            {...register('email', { required: 'El correo es requerido' })}
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            {...register('password', { required: 'La contraseña es requerida' })}
                        />
                        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Confirmar Contraseña"
                            type="password"
                            fullWidth
                            {...register('password_confirmation', { required: 'La confirmacion de la contraseña es requerida' })}
                        />
                        {errors.password_confirmation && <span style={{ color: 'red' }}>{errors.password_confirmation.message}</span>}
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Celular"
                            type="tel"
                            fullWidth
                            {...register('phone', { required: 'El celular es requerido' })}
                        />
                        {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
                        </Grid>
                        <Grid size={12}>
                        <Button type="submit" disabled={isLoading === 'pending'} variant="contained" color="primary" fullWidth>
                        {
                            isLoading ? 
                            <div style={{ paddingRight: '5px' }} >
                                <Oval height="20" width="20" color="white" strokeWidth={8} ariaLabel="loading" />
                            </div> : null
                        }
                        Registrarse 
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
                <p>¿Ya posee cuenta? <Link to="/login">Inicie Sesi&oacute;n</Link></p>
                <hr />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleGoogleLogin} 
                    sx={{ mt: 2, backgroundColor: '#0E0C54', '&:hover': { backgroundColor: '#005DC3', }, }} > 
                    <img src="https://pngimg.com/uploads/google/google_PNG19630.png" width={30} height={30} alt="" style={{ marginRight: '5px' }} />
                    Iniciar sesión con Google 
                </Button>
            </CardContent>
        </Card>
      </Box>
    </Container>;
}
