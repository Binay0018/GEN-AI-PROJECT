import clsx from 'clsx';
import Loader from './Loader';
import './Button.scss';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  icon,
  ...props
}) => (
  <button
    className={clsx('btn', `btn--${variant}`, `btn--${size}`, className)}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? <Loader size="sm" /> : icon}
    {children}
  </button>
);

export default Button;
