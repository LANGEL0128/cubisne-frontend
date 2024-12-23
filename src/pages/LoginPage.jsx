import React, { useState } from 'react'; 
import logo from '../assets/Logo-CuBisne.png';
import { TextField, Button, Box, Container, Typography, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';

export default function LoginPage() {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        // Aquí va la lógica de autenticación 
        console.log('Login:', { email, password }); 
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </Grid>
                        <Grid size={12}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </Grid>
                        <Grid size={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Iniciar Sesi&oacute;n
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
                <p>¿No tiene cuenta? <Link to="/register">Reg&iacute;strese</Link></p>
                <p>¿Olvid&oacute; su contraseña? <Link to="/recover">Recuperar </Link></p>
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
