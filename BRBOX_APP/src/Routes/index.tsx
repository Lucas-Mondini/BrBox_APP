import React from 'react';
//import { useAuth } from '../Contexts/Auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const signed = true;//useAuth();

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;