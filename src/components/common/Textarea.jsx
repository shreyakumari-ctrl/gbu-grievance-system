function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = "",
  required = false,
  rows = 5,
  maxLength,
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

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`px-4 py-2.5 rounded-xl border bg-white/80 text-slate-800
          placeholder:text-slate-400 outline-none transition-colors duration-200
          resize-none focus:ring-2 focus:ring-indigo-400
          ${error ? "border-red-400" : "border-slate-200 focus:border-indigo-400"}`}
        {...rest}
      />

      <div className="flex justify-between items-center">
        <div>
          {error && (
            <p id={`${name}-error`} className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>

        {maxLength && (
          <p className="text-xs text-slate-400">
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

export default Textarea;