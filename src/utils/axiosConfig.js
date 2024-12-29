import axios from 'axios';
import { selectAccessToken } from '../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../redux/store';

console.log(store.getState());

// const access_token = useSelector(selectAccessToken);
// const dispatch = useDispatch();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia 'http://tudominio.com/api' a la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + store.getState().access_token
  },
});

axiosInstance.interceptors.request.use( (config) => { 
        const token = store.getState().auth.access_token; 
        if (token) { 
            config.headers.Authorization = `Bearer ${token}`; 
        } 
        return config; 
    }, (error) => { 
        return Promise.reject(error); 
    } 
);

// Puedes agregar otros interceptores o configuraciones aquí, si es necesario

export default axiosInstance;
