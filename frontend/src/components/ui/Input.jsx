import clsx from 'clsx';
import './Input.scss';

const Input = ({
  label,
  error,
  hint,
  className,
  id,
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className={clsx('input-field', { 'input-field--error': error }, className)}>
      {label && (
        <label htmlFor={inputId} className="input-field__label">
          {label}
        </label>
      )}
      <input id={inputId} className="input-field__input" {...props} />
      {error && <span className="input-field__error">{error}</span>}
      {hint && !error && <span className="input-field__hint">{hint}</span>}
    </div>
  );
};

export default Input;
