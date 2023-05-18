import { useLocalStorageState } from 'ahooks';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '../types';
import { nonNullable } from '../utils';

type PrivateRouteProps = {
  requiredRole: UserRole;
};

export const PrivateRoutes = ({ requiredRole }: PrivateRouteProps) => {
  const [authData] = useLocalStorageState<{
    email: string;
    role: UserRole;
  }>('authData');
  const token = localStorage.getItem('authToken');
  const role = authData?.role; // Replace with your authentication logic

  return nonNullable(token) && role === requiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
