import { Route, Routes } from 'react-router-dom';
import PrivateLayout from '../components/private-layout';
import Login from './login-page';
import { PrivateRoute } from './private-route';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<PrivateLayout />} />
      <Route path="/" element={<PrivateRoute path="" element={<></>} />} />
    </Routes>
  );
};
