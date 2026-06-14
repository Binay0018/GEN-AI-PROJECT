import { Outlet } from 'react-router';
import Navbar from '../components/layout/Navbar';
import './DashboardLayout.scss';

const DashboardLayout = () => (
  <div className="dashboard-layout">
    <Navbar />
    <main className="dashboard-layout__content">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
