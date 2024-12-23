import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/User/Dashboard/Dashboard';

const UserPage = () => {
  return (
    <div>
      <h1>Aplicación de Usuario</h1>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Añadir más subrutas según sea necesario */}
      </Routes>
    </div>
  );
};

export default UserPage;
