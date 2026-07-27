const STATUS_STYLES = {
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
};

function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] || "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;