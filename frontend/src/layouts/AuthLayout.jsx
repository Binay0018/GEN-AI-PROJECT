import { Outlet } from 'react-router';
import './AuthLayout.scss';

const AuthLayout = () => (
  <div className="auth-layout">
    <div className="auth-layout__glow auth-layout__glow--1" />
    <div className="auth-layout__glow auth-layout__glow--2" />
    <div className="auth-layout__content">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
