import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Admin/Dashboard/Dashboard';

const AdminPage = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        {/* Añadir más subrutas según sea necesario */}
      </Routes>
    </div>
  );
};

export default AdminPage;
