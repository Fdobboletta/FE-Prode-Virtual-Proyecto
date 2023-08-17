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

import { RoomMatches } from './admin/room-matches';
import { RoomParticipants } from './admin/room-participants';
import { AdminPage } from './admin/admin-page';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoutes requiredRole={UserRole.Player} />}>
        <Route path="/user" element={<UserPage />} />
      </Route>
      <Route element={<PrivateRoutes requiredRole={UserRole.Admin} />}>
        <Route path="/admin" element={<Navigate to="/admin/rooms" />} />
        <Route path="/admin/integrations" element={<IntegrationsPage />} />
        <Route
          path="/admin/reports"
          element={<AdminPage>Hello World</AdminPage>}
        />
        <Route path="/admin/rooms" element={<RoomsPage />} />
        <Route path="/admin/room/:roomId/matches" element={<RoomMatches />} />
        <Route
          path="/admin/room/:roomId/participants"
          element={<RoomParticipants />}
        />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
    </Routes>
  );
};
