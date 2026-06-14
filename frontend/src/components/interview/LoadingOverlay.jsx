import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import './LoadingOverlay.scss';

const LoadingOverlay = ({ progress, message }) => (
  <motion.div
    className="loading-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="loading-overlay__content">
      <motion.div
        className="loading-overlay__icon"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <HiSparkles />
      </motion.div>

      <h2 className="loading-overlay__title">AI is crafting your report</h2>

      <div className="loading-overlay__bar">
        <motion.div
          className="loading-overlay__bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <p className="loading-overlay__progress">{progress}%</p>

      <motion.p
        key={message}
        className="loading-overlay__message"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {message}
        <span className="loading-overlay__cursor">|</span>
      </motion.p>

      <div className="loading-overlay__dots">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export default LoadingOverlay;
