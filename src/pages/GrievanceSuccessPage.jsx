import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiClock, FiSearch, FiPlusCircle, FiHome } from "react-icons/fi";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { ROUTES } from "../routes/routePaths";

function GrievanceSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticketId = location.state?.ticketId;
  const submittedAt = location.state?.submittedAt;

  useEffect(() => {
    if (!ticketId) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [ticketId, navigate]);

  if (!ticketId) {
    return null;
  }

  const formattedDate = submittedAt
    ? new Date(submittedAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <Card className="max-w-md w-full text-center relative overflow-hidden">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
          <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
            <FiCheckCircle className="text-5xl text-green-500" aria-hidden="true" />
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Grievance Submitted Successfully
        </h1>
        <p className="text-slate-500 mb-6">
          Your issue has been received and is now pending review.
        </p>

        <div className="bg-indigo-50/60 rounded-2xl p-5 mb-6 text-left flex flex-col gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Ticket ID</p>
            <p className="text-xl font-mono font-bold text-indigo-600">{ticketId}</p>
          </div>

          {formattedDate && (
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Submitted On</p>
              <p className="text-slate-700 flex items-center gap-1.5">
                <FiClock className="text-slate-400" aria-hidden="true" />
                {formattedDate}
              </p>
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
              Pending
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Please save your Ticket ID - you'll need it to track your grievance.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.TRACK_GRIEVANCE)}
            className="w-full flex items-center justify-center gap-2"
          >
            <FiSearch aria-hidden="true" /> Track My Grievance
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.SUBMIT_GRIEVANCE)}
            className="w-full flex items-center justify-center gap-2"
          >
            <FiPlusCircle aria-hidden="true" /> Submit Another Grievance
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.HOME)}
            className="w-full flex items-center justify-center gap-2"
          >
            <FiHome aria-hidden="true" /> Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default GrievanceSuccessPage;