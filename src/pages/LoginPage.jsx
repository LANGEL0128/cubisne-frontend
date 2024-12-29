import React, { useEffect, useState } from 'react'; 
import logo from '../assets/Logo-CuBisne.png';
import { TextField, Button, Box, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { login } from '../services/authService';
import { loginReducer } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

export default function LoginPage() {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => { 
        // Aquí va la lógica de autenticación
        setIsLoading(true); 
        console.log('Login:', data); 
        login(data).then(response => {
            const { access_token } = response.data.data;
            localStorage.setItem('access_token_cubisne', access_token);
            dispatch(loginReducer(response.data.data));
            setIsLoading(false); 
            toast.success(`Genial!! Ha iniciado sesión satisfactoriamente`);
            navigate('/dashboard');
        }).catch(error => {
            console.log(error);
            toast.error(`Error: ${error.response?.data.message}`);
            setIsLoading(false); 
        });
    }

    const handleGoogleLogin = (e) => {
        e.preventDefault();
    }

    return <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Card variant="outlined" style={{ textAlign: 'center', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
            <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                Iniciar Sesi&oacute;n
                </Typography>
                <img src={logo} alt="Logo" style={{ width: '150px' }} />
                <p>Introduce Email y Contrase&ntilde;a para iniciar sesi&oacute;n en la aplicaci&oacute;n para todos los negocios de Cuba</p>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            { ...register('email', { required: 'El correo es requerido' }) }
                        />
                        { errors.email && <span style={{ color: 'red' }}>{ errors.email.message }</span> }
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            { ...register('password', { required: 'La contraseña es requerida' }) }
                        />
                        { errors.password && <span style={{ color: 'red' }}>{ errors.password.message }</span> }
                        </Grid>
                        <Grid size={12}>
                        <Button type="submit" disabled={isLoading} variant="contained" color="primary" fullWidth>
                            {
                                isLoading === true ? 
                                <div style={{ paddingRight: '5px' }} >
                                    <Oval height="20" width="20" color="white" strokeWidth={8} ariaLabel="loading" />
                                </div> : null
                            }
                            Iniciar Sesi&oacute;n
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
                <p>¿No tiene cuenta? <Link to="/register">Reg&iacute;strese</Link></p>
                <p>¿Olvid&oacute; su contraseña? <Link to="/recovery">Recuperar </Link></p>
                <hr />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleGoogleLogin} 
                    sx={{ mt: 2, backgroundColor: '#0E0C54', 
                        // Color azul de Google 
                        '&:hover': { backgroundColor: '#005DC3', 
                            // Color azul oscuro al pasar el ratón 
                        }, 
                    }} > 
                    <img src="https://pngimg.com/uploads/google/google_PNG19630.png" width={30} height={30} alt="" style={{ marginRight: '5px' }} />
                    Iniciar sesión con Google 
                </Button>
            </CardContent>
        </Card>
      </Box>
    </Container>;
}
