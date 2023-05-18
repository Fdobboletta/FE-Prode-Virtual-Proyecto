import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateLayout } from '../components/private-layout';
import { UserRole } from '../types';
import { LoginPage } from './login-page';
import { PrivateRoutes } from './private-routes';
import { RegisterPage } from './sing-up-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes requiredRole={UserRole.PLAYER} />}>
        <Route
          path="/user"
          element={<PrivateLayout drawerTitle="Player Panel" />}
        />
      </Route>
      <Route element={<PrivateRoutes requiredRole={UserRole.ADMIN} />}>
        <Route
          path="/admin"
          element={<PrivateLayout drawerTitle="Admin Panel" />}
        />
      </Route>
      <Route element={<Navigate to="/login" />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
    </Routes>
  );
};
