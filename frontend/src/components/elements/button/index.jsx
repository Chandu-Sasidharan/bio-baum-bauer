import classNames from 'classnames';

const Button = ({ onClick, primary, children, type }) => {
  return (
    <button
      className={classNames(
        'btn btn-sm rounded-md tracking-wider duration-300 focus:ring-0',
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
