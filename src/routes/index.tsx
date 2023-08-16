import { UserRole } from '@/generated/graphql-types.generated';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './private-routes';

import { UserPage } from './user-page';
import { ResetPasswordPage } from './auth/reset-password-page';
import { LoginPage } from './auth/login-page';
import { RegisterPage } from './auth/sing-up-page';
import { ChangePasswordPage } from './auth/change-password-page';
import { IntegrationsPage } from './admin/integrations';
import { RoomsPage } from './admin/rooms';

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
        <Route path="/admin/salas" element={<RoomsPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
    </Routes>
  );
};
