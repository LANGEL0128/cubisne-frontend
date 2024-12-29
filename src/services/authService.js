import { store } from "../redux/store";
import axiosInstance from "../utils/axiosConfig"

export const login = (data) => axiosInstance.post('/auth/login', data);
export const refresh = () => axiosInstance.get('/auth/refresh');
export const registerUser = (data) => axiosInstance.post('/auth/register', data);
export const logout = () => axiosInstance.get('/auth/logout');
export const me = () => axiosInstance.get('/auth/me');
export const profile = (data) => axiosInstance.post('/auth/me', data);
export const passwordEmail = (data) => axiosInstance.post('/auth/password/email', data);
export const passwordReset = (data) => axiosInstance.post('/auth/password/reset', data);