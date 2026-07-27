function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder = "",
  required = false,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`px-4 py-2.5 rounded-xl border bg-white/80 text-slate-800
          placeholder:text-slate-400 outline-none transition-colors duration-200
          focus:ring-2 focus:ring-indigo-400
          ${error ? "border-red-400" : "border-slate-200 focus:border-indigo-400"}`}
        {...rest}
      />

      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;