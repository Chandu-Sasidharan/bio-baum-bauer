import classNames from 'classnames';

const Button = ({
  onClick,
  primary = false,
  children,
  size = 'sm',
  type = 'button',
  classnames = '',
  disabled = false,
}) => {
  const buttonClass = classNames(
    'btn rounded-md tracking-wider duration-300 focus:ring-0',
    `btn-${size}`,
    classnames,
    {
      'bg-accent hover:bg-accent-light text-primary-light': !primary,
      'bg-primary hover:bg-primary-light text-accent': primary,
      'btn-disabled': disabled,
    }
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
