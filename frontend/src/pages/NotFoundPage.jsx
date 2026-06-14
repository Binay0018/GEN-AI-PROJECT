import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { HiHome } from 'react-icons/hi2';
import Button from '../components/ui/Button';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <motion.div
        className="not-found__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="not-found__illustration">
          <span className="not-found__digit not-found__digit--4">4</span>
          <motion.span
            className="not-found__digit not-found__digit--0"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            0
          </motion.span>
          <span className="not-found__digit not-found__digit--4b">4</span>
        </div>

        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>

        <Button size="lg" icon={<HiHome />} onClick={() => navigate('/')}>
          Go Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
