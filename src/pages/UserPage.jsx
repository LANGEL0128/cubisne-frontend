import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../components/User/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { logout } from '../services/authService';
import { toast } from 'react-toastify';
import { logoutReducer } from '../redux/slices/authSlice';
import { Oval } from 'react-loader-spinner';
import { Button } from '@mui/material';

const UserPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);
    logout().then(response => {
      localStorage.removeItem('access_token_cubisne');
      dispatch(logoutReducer());
      setIsLoading(false);
      toast.success(`Genial!! Se ha cerrado la sesión correctamente`);
      navigate('/login');
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
      toast.error(`Error: ${error.response?.data.message}`);
    });
  }

  return (
    <div>
      <h1>Aplicación de Usuario</h1>
      <Button disabled={isLoading} onClick={() => handleLogout()} variant="contained" color="primary" fullWidth>
          {
              isLoading === true ? 
              <div style={{ paddingRight: '5px' }} >
                  <Oval height="20" width="20" color="white" strokeWidth={8} ariaLabel="loading" />
              </div> : null
          }
          Cerrar Sesi&oacute;n
      </Button>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Añadir más subrutas según sea necesario */}
      </Routes>
    </div>
  );
};

export default UserPage;
