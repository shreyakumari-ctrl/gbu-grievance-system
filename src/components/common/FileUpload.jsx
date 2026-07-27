import { useRef } from "react";
import { FiUploadCloud, FiX, FiPaperclip } from "react-icons/fi";

function FileUpload({
  label,
  name,
  file,
  onFileSelect,
  error,
  accept = "image/*,.pdf,.doc,.docx",
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0] || null;
    onFileSelect(selectedFile);
  };

  const handleRemove = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}

      <input
        ref={fileInputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        hidden
      />

      {!file ? (
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className={`flex items-center justify-center gap-2 px-4 py-6
            rounded-xl border-2 border-dashed text-slate-500
            hover:border-indigo-400 hover:text-indigo-600 transition-colors duration-200
            ${error ? "border-red-400" : "border-slate-300"}`}
        >
          <FiUploadCloud className="text-xl" aria-hidden="true" />
          <span className="text-sm font-medium">
            Click to upload a supporting file (optional)
          </span>
        </button>
      ) : (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white/80">
          <div className="flex items-center gap-2 text-sm text-slate-700 truncate">
            <FiPaperclip className="text-indigo-500 shrink-0" aria-hidden="true" />
            <span className="truncate">{file.name}</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove selected file"
            className="text-slate-400 hover:text-red-500 transition-colors duration-200 shrink-0 ml-2"
          >
            <FiX />
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FileUpload;