import { createTheme } from '@mui/material/styles';

const colorPrincipal = '#f44336';
const colorSecondary = '#dc004e';

const theme = createTheme({
  palette: {
    primary: {
      main: colorPrincipal, // Color principal rojo
    },
    secondary: {
      main: '#dc004e', // Otro tono de rojo para el color secundario
    },
    background: {
      default: '#f4f6f8', // Color de fondo
    },
    text: {
      primary: '#333', // Color de texto principal
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colorPrincipal, // Color de fondo del botón rojo
          '&:hover': {
            backgroundColor: '#d32f2f', // Color de fondo del botón al pasar el ratón
          },
        },
      },
    },
    MuiCard: { 
        styleOverrides: { 
            root: { 
                border: '1px solid '+colorPrincipal, // Borde rojo para el card 
                boxShadow: '0px 0px 3px 1px '+colorPrincipal,
            }, 
        }, 
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
