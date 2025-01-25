import classNames from 'classnames';

const Button = ({
  onClick,
  primary = false,
  children,
  size = 'md',
  type = 'button',
  classnames = '',
  disabled = false,
  isProcessing = false,
}) => {
  const buttonClass = classNames(
    'btn rounded-md tracking-wider duration-300 focus:ring-0',
    {
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
      'bg-accent hover:bg-accent-light text-primary-light': !primary,
      'bg-primary hover:bg-primary-light text-accent': primary,
      'btn-disabled': disabled || isProcessing,
    },
    classnames
  );

  const loadingClass = classNames({
    'loading loading-dots loading-xs': size === 'xs',
    'loading loading-dots loading-sm': size === 'sm',
    'loading loading-dots loading-md': size === 'md',
    'loading loading-dots loading-lg': size === 'lg',
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled || isProcessing}
    >
      {isProcessing ? <span className={loadingClass}></span> : children}
    </button>
  );
};

export default Button;
