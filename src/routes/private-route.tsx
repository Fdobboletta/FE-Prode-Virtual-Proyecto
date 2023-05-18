import { useLocalStorageState } from 'ahooks';
import { Navigate, Route } from 'react-router-dom';

type PrivateRouteProps = {
  path: string;
  element: React.ReactNode;
};

export const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
  const [authToken, setAuthToken] = useLocalStorageState<string>('authToken');
  const isAuthenticated =  // Replace with your authentication logic

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};
