import { AnimatePresence, motion } from 'framer-motion';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from 'react-icons/io5';
import { useToast } from '../../hooks/useToast';
import './ToastNotification.scss';

const icons = {
  success: IoCheckmarkCircle,
  error: IoCloseCircle,
  info: IoInformationCircle,
};

const ToastNotification = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || icons.info;
          return (
            <motion.div
              key={toast.id}
              className={`toast toast--${toast.type}`}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              layout
            >
              <Icon className="toast__icon" />
              <span className="toast__message">{toast.message}</span>
              <button
                className="toast__close"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss"
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;
