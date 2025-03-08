import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const User = storedUser?.token;


    return (
        User ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes  