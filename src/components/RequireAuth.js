import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({allowedRoles}) => {
   const { auth } = useAuth();
   const location = useLocation();
   console.log('======> auth', !auth.firstName);
   console.log('======>allowedRoles',allowedRoles);
   return (

    auth?.role_id && allowedRoles?.includes(auth?.role_id)
    ? <Outlet />
    : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
       
      // (!auth.firstName && <Navigate to="/unauthorized" state={{ from: location }} replace />)
   )
};

export default RequireAuth;
