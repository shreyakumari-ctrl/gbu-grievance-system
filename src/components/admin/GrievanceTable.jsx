import { FiEye } from "react-icons/fi";
import StatusBadge from "../common/StatusBadge";
import Select from "../common/Select";

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

function GrievanceTable({ grievances, onStatusChange, onViewDetails }) {
  if (grievances.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-lg font-medium">No grievances match your search/filter.</p>
      </div>
    );
  }

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 sticky top-0 z-10">
          <tr className="text-left text-slate-500 uppercase text-xs tracking-wide">
            <th className="px-4 py-3">Ticket ID</th>
            <th className="px-4 py-3">Student Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {grievances.map((g) => (
            <tr key={g.ticketId} className="hover:bg-indigo-50/40 transition-colors duration-150">
              <td className="px-4 py-3 font-mono text-indigo-600 font-semibold whitespace-nowrap">
                {g.ticketId}
              </td>
              <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{g.name}</td>
              <td className="px-4 py-3 text-slate-600 capitalize whitespace-nowrap">{g.category}</td>
              <td className="px-4 py-3">
                <StatusBadge status={g.status} />
              </td>
              <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                {formatDate(g.submittedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onViewDetails(g.ticketId)}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    aria-label={`View details for ${g.ticketId}`}
                  >
                    <FiEye />
                  </button>
                  <div className="w-36">
                    <Select
                      name={`status-${g.ticketId}`}
                      value={g.status}
                      onChange={(e) => onStatusChange(g.ticketId, e.target.value)}
                      options={statusOptions}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GrievanceTable;