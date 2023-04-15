import { Navigate, Route } from 'react-router-dom';

type PrivateRouteProps = {
  path: string;
  element: React.ReactNode;
};

export const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
  const isAuthenticated = false; // Replace with your authentication logic

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};
