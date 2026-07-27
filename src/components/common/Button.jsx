function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...rest
}) {
  const baseStyles =
    "px-5 py-2.5 rounded-2xl font-medium transition-all duration-200 ease-out " +
    "active:scale-[0.98] " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-indigo-400 focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-300/60",
    secondary:
      "bg-white/80 text-indigo-600 border border-indigo-200 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md",
    danger:
      "bg-red-500 text-white shadow-md shadow-red-200 hover:bg-red-600 hover:shadow-lg hover:shadow-red-300/60",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;