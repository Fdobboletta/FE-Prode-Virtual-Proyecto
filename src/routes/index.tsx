import { UserRole } from '@/generated/graphql-types.generated';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IntegrationsPage } from './integrations';

import { PrivateRoutes } from './private-routes';

import { UserPage } from './user-page';
import { ResetPasswordPage } from './auth/reset-password-page';
import { LoginPage } from './auth/login-page';
import { RegisterPage } from './auth/sing-up-page';
import { ChangePasswordPage } from './auth/change-password-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes requiredRole={UserRole.Player} />}>
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route element={<PrivateRoutes requiredRole={UserRole.Admin} />}>
        <Route path="/admin" element={<Navigate to="/admin/integrations" />} />
        <Route path="/admin/integrations" element={<IntegrationsPage />} />
      </Route>
      <Route element={<Navigate to="/login" />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
    </Routes>
  );
};
