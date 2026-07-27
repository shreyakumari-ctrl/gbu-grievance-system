
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiHash, FiMail, FiTag, FiClock, FiFileText, FiPaperclip } from "react-icons/fi";
import Card from "../components/common/Card";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import StatusBadge from "../components/common/StatusBadge";
import { useGrievances } from "../context/GrievanceContext";
import { ROUTES } from "../routes/routePaths";

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

function GrievanceDetailPage() {
  // useParams reads the dynamic ":ticketId" segment from the URL
  // (e.g., /admin/grievance/GBU-2026-4821 -> ticketId = "GBU-2026-4821")
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { getGrievanceByTicketId, updateGrievanceStatus } = useGrievances();

  const grievance = getGrievanceByTicketId(ticketId);

  if (!grievance) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Grievance not found</h1>
        <p className="text-slate-500">No grievance matches ticket ID "{ticketId}".</p>
        <Button variant="primary" onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <FiArrowLeft aria-hidden="true" /> Back to Dashboard
        </button>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Ticket ID</p>
              <p className="text-xl font-mono font-bold text-indigo-600">{grievance.ticketId}</p>
            </div>
            <StatusBadge status={grievance.status} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <DetailItem icon={FiUser} label="Student Name" value={grievance.name} />
            <DetailItem icon={FiHash} label="Roll Number" value={grievance.rollNumber} />
            <DetailItem icon={FiMail} label="Email" value={grievance.email} />
            <DetailItem icon={FiTag} label="Category" value={grievance.category} />
            <DetailItem icon={FiClock} label="Submitted On" value={formatDate(grievance.submittedAt)} />
            {grievance.attachmentName && (
              <DetailItem icon={FiPaperclip} label="Attachment" value={grievance.attachmentName} />
            )}
          </div>

          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-1 flex items-center gap-1.5">
              <FiFileText aria-hidden="true" /> Description
            </p>
            <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 rounded-xl p-4">
              {grievance.description}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <Select
              label="Update Status"
              name="status"
              value={grievance.status}
              onChange={(e) => updateGrievanceStatus(grievance.ticketId, e.target.value)}
              options={statusOptions}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="text-indigo-400 mt-0.5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-slate-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default GrievanceDetailPage;