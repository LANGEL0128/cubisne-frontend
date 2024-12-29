import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RecoveryPage from './pages/RecoveryPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectIsLogged, selectUser } from './redux/slices/authSlice';

const App = () => {

  return (
    <Router>
      <AppContent />
      <ToastContainer
        position="bottom-right" 
        autoClose={8000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const isAuthenticated = useSelector(selectIsLogged); // Aquí debes poner tu lógica de autenticación
  const user = useSelector(selectUser); // Aquí debes poner tu lógica para obtener el rol del usuario autenticado
  const nodeRef = useRef(null);

  const hasRole = (role) => { 
    return user.roles.some(userRole => userRole.name === role); 
  };

  const PrivateRoute = ({ children, role }) => {
    console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  useEffect(() => { 
    if (location.pathname === '/login') { 
      document.body.className = 'login-bg'; 
    } else if (location.pathname === '/register') { 
      document.body.className = 'register-bg'; 
    } else if (location.pathname === '/recovery' || location.pathname === '/reset-password') { 
      document.body.className = 'password-bg'; 
    } else { 
      document.body.className = ''; 
    } 
  }, [location]);

  return (
    <Routes location={location}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recovery" element={<RecoveryPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute role="cliente">
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute role="cliente">
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App;
