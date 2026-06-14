import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import './Navbar.scss';

const Navbar = ({ transparent = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      className={`navbar ${transparent ? 'navbar--transparent' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <HiSparkles className="navbar__logo" />
          <span>InterviewAI</span>
        </Link>

        <div className="navbar__links">
          {!user ? (
            <>
              <Link to="/#features" className="navbar__link">Features</Link>
              <Link to="/#how-it-works" className="navbar__link">How It Works</Link>
              <Link to="/login" className="navbar__link">Sign In</Link>
              <Button size="sm" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="navbar__link">Dashboard</Link>
              <span className="navbar__user">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
