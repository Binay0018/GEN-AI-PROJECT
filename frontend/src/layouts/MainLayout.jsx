import { Outlet } from 'react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './MainLayout.scss';

const MainLayout = ({ transparentNav = false }) => (
  <div className="main-layout">
    <Navbar transparent={transparentNav} />
    <main className="main-layout__content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
