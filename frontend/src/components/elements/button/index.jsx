import classNames from 'classnames';

const Button = ({ onClick, primary, children, size = 'sm' }) => {
  return (
    <button
      className={classNames(
        `btn rounded-md tracking-wider duration-300 focus:ring-0 btn-${size}`,
        {
          'bg-accent hover:!bg-accent-light text-primary-light': !primary,
          'bg-primary hover:!bg-primary-light text-accent': primary,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
