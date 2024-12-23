import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RecoveryPage from './pages/RecoveryPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const isAuthenticated = true; // Aquí debes poner tu lógica de autenticación
  const userRole = "admin"; // Aquí debes poner tu lógica para obtener el rol del usuario autenticado
  const PrivateRoute = ({ children, role }) => {
    return isAuthenticated && userRole === role ? children : <Navigate to="/login" />;
  };

  useEffect(() => { 
    if (location.pathname === '/login') { 
      document.body.className = 'login-bg'; 
    } else if (location.pathname === '/register') { 
      document.body.className = 'register-bg'; 
    } else { 
      document.body.className = ''; 
    } 
  }, [location]);

  return (<Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/recovery" element={<RecoveryPage />} />
    <Route
      path="/admin/*"
      element={
        <PrivateRoute role="admin">
          <AdminPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/user/*"
      element={
        <PrivateRoute role="user">
          <UserPage />
        </PrivateRoute>
      }
    />
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>)
}

export default App;
