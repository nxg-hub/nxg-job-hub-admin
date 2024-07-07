import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = () => {
    const token = JSON.parse(window.localStorage.getItem('ACCESSTOKEN'));

    return token ? <Outlet/> : <Navigate to='/' exact />
};