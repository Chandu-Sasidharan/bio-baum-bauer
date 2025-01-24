import classNames from 'classnames';

const Button = ({
  onClick,
  primary,
  children,
  size = 'sm',
  type,
  classnames,
}) => {
  return (
    <button
      className={classNames(
        `btn rounded-md tracking-wider duration-300 focus:ring-0 btn-${size} ${classnames}`,
        {
          'bg-accent hover:!bg-accent-light text-primary-light': !primary,
          'bg-primary hover:!bg-primary-light text-accent': primary,
        }
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
