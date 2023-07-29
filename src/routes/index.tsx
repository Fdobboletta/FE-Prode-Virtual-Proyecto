import { UserRole } from '@/generated/graphql-types.generated';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminPage } from './admin-page';
import { ChangePasswordPage } from './change-password-page';
import { LoginPage } from './login-page';
import { PrivateRoutes } from './private-routes';
import { ResetPasswordPage } from './reset-password-page';
import { RegisterPage } from './sing-up-page';
import { UserPage } from './user-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes requiredRole={UserRole.Player} />}>
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route element={<PrivateRoutes requiredRole={UserRole.Admin} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route element={<Navigate to="/login" />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-password/:token" element={<ChangePasswordPage />} />
    </Routes>
  );
};
