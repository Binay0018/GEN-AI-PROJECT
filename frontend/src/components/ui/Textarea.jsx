import clsx from 'clsx';
import './Textarea.scss';

const Textarea = ({
  label,
  error,
  hint,
  charCount,
  maxLength,
  className,
  id,
  ...props
}) => {
  const inputId = id || props.name;
  const currentLength = props.value?.length ?? 0;

  return (
    <div className={clsx('textarea-field', { 'textarea-field--error': error }, className)}>
      {label && (
        <label htmlFor={inputId} className="textarea-field__label">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className="textarea-field__input"
        maxLength={maxLength}
        {...props}
      />
      <div className="textarea-field__footer">
        {error ? (
          <span className="textarea-field__error">{error}</span>
        ) : hint ? (
          <span className="textarea-field__hint">{hint}</span>
        ) : (
          <span />
        )}
        {maxLength && (
          <span className="textarea-field__counter">
            {charCount ?? currentLength} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
