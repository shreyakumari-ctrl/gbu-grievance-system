import { useNavigate } from "react-router-dom";
import { FiFileText, FiSearch, FiCheckCircle } from "react-icons/fi";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { ROUTES } from "../routes/routePaths";


const steps = [
  {
    icon: <FiFileText className="text-3xl text-indigo-600" aria-hidden="true" />,
    title: "Submit",
    description: "Fill a simple form describing your issue and get a unique Ticket ID instantly.",
  },
  {
    icon: <FiSearch className="text-3xl text-indigo-600" aria-hidden="true" />,
    title: "Track",
    description: "Use your Ticket ID anytime to check the current status of your grievance.",
  },
  {
    icon: <FiCheckCircle className="text-3xl text-indigo-600" aria-hidden="true" />,
    title: "Resolved",
    description: "Once the university resolves your issue, your ticket status updates to Resolved.",
  },
];

function HomePage() {
  
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
          GBU Grievance Management System
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          A simple way for students to raise issues, track progress, and get
          resolutions - all in one place.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.SUBMIT_GRIEVANCE)}
          >
            Submit a Grievance
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.TRACK_GRIEVANCE)}
          >
            Track Your Grievance
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card key={step.title} className="text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;