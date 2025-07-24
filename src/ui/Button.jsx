const Button = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  color,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: color }}
      className={`
        w-full p-4 text-white font-semibold rounded-xl
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
