import clsx from 'clsx';
import './Card.scss';

const Card = ({ children, className, hover = false, padding = 'md', ...props }) => (
  <div
    className={clsx(
      'card',
      `card--padding-${padding}`,
      { 'card--hover': hover },
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
