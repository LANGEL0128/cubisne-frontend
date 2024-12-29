import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 
import theme from './theme';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(

    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider> 
    </ThemeProvider>

)
