import { useLocation, Outlet, Navigate } from 'react-router-dom';
import userAuth from '../../hooks/useAuth';

const ValidateAuth = () => {
    const { auth } = userAuth();
    const location = useLocation();

    return (
        auth ?
            auth?.userRole !== 'Section Staff'
                ? <Navigate to={`/${auth?.userRole}/dashboard`} state={{ from: location }} replace />
                : <Navigate to='/dashboard' state={{ from: location }} replace />
        : <Outlet />
    );
    
};

export default ValidateAuth;
