import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHash, FiTag, FiClock, FiFileText, FiPlusCircle } from "react-icons/fi";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import StatusBadge from "../components/common/StatusBadge";
import GrievanceTimeline from "../components/student/GrievanceTimeline";
import { useGrievances } from "../context/GrievanceContext";
import { ROUTES } from "../routes/routePaths";

function TrackGrievancePage() {
  const navigate = useNavigate();
  const { getGrievanceByTicketId } = useGrievances();

  const [ticketIdInput, setTicketIdInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedId = ticketIdInput.trim();
    if (!trimmedId) {
      setError("Please enter a Ticket ID");
      return;
    }
    setError("");

    const found = getGrievanceByTicketId(trimmedId);
    setResult(found || false);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Track Your Grievance
        </h1>
        <p className="text-slate-600 text-center mb-8">
          Enter your Ticket ID below to check the current status.
        </p>

        <Card className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-start">
            <div className="flex-1 w-full">
              <Input
                name="ticketId"
                placeholder="e.g., GBU-2026-4821"
                value={ticketIdInput}
                onChange={(e) => setTicketIdInput(e.target.value)}
                error={error}
              />
            </div>
            <Button type="submit" variant="primary" className="flex items-center gap-2 sm:mt-0">
              <FiSearch aria-hidden="true" /> Search
            </Button>
          </form>
        </Card>

        {result && (
          <Card className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Ticket ID</p>
                <p className="text-lg font-mono font-bold text-indigo-600">{result.ticketId}</p>
              </div>
              <StatusBadge status={result.status} />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <DetailRow icon={FiUser} label="Student Name" value={result.name} />
              <DetailRow icon={FiHash} label="Enrollment / Roll Number" value={result.rollNumber} />
              <DetailRow icon={FiTag} label="Category" value={result.category} />
              <DetailRow icon={FiClock} label="Submitted On" value={formatDate(result.submittedAt)} />
            </div>

            <div className="mb-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1 flex items-center gap-1.5">
                <FiFileText aria-hidden="true" /> Description
              </p>
              <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 rounded-xl p-4">
                {result.description}
              </p>
            </div>
          </Card>
        )}

        {result && (
          <Card>
            <h2 className="text-lg font-semibold text-slate-800 mb-6">Progress Timeline</h2>
            <GrievanceTimeline status={result.status} />
          </Card>
        )}

        {result === false && (
          <Card className="text-center py-12">
            <FiSearch className="text-5xl text-slate-300 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">No grievance found</h2>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              We couldn't find any grievance matching that Ticket ID. Please
              double-check and try again, or submit a new grievance.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate(ROUTES.SUBMIT_GRIEVANCE)}
              className="inline-flex items-center gap-2"
            >
              <FiPlusCircle aria-hidden="true" /> Submit New Grievance
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
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

export default TrackGrievancePage;