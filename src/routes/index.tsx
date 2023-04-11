import { Route, Routes } from 'react-router-dom';
import { TestGraphql } from '../graphql/TestGraphql';
import { PrivateRoute } from './private-route';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<TestGraphql />} />
      <Route path="/" element={<PrivateRoute path="" element={<></>} />} />
    </Routes>
  );
};
