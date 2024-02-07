import { useLocation, Outlet, Navigate } from 'react-router-dom';
import userAuth from '../../hooks/useAuth';

const ProtectedRoutes = ({ allowedRoles }) => {
    const { auth } = userAuth();
    const location = useLocation();

    return (
        allowedRoles.includes(auth?.userRole)
            ? <Outlet />
            : auth
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
    
};

export default ProtectedRoutes;
