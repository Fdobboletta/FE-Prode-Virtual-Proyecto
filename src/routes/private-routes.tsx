import { UserRole } from '@/generated/graphql-types.generated';
import { useLocalStorageState } from 'ahooks';
import { Navigate, Outlet } from 'react-router-dom';

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
  const role = authData?.role;

  return nonNullable(token) && role === requiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
