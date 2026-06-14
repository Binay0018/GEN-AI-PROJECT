import clsx from 'clsx';
import './Loader.scss';

const Loader = ({ size = 'md', className }) => (
  <span className={clsx('loader', `loader--${size}`, className)} aria-label="Loading">
    <span className="loader__spinner" />
  </span>
);

export default Loader;
