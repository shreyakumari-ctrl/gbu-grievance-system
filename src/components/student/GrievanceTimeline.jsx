import { FiCheck, FiClock, FiLoader } from "react-icons/fi";

const stages = [
  { key: "submitted", label: "Submitted", matchStatus: "Pending", icon: FiCheck },
  { key: "in-progress", label: "In Progress", matchStatus: "In Progress", icon: FiLoader },
  { key: "resolved", label: "Resolved", matchStatus: "Resolved", icon: FiClock },
];

function getCurrentStageIndex(status) {
  if (status === "Resolved") return 2;
  if (status === "In Progress") return 1;
  return 0;
}

function GrievanceTimeline({ status }) {
  const currentStageIndex = getCurrentStageIndex(status);

  return (
    <div className="flex flex-col">
      {stages.map((stage, index) => {
        const isComplete = index < currentStageIndex;
        const isCurrent = index === currentStageIndex;
        const Icon = stage.icon;

        return (
          <div key={stage.key} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                  ${
                    isComplete || isCurrent
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
              >
                <Icon className="text-base" aria-hidden="true" />
              </div>

              {index < stages.length - 1 && (
                <div
                  className={`w-0.5 flex-1 min-h-8 transition-colors duration-300
                    ${isComplete ? "bg-indigo-600" : "bg-slate-200"}`}
                />
              )}
            </div>

            <div className="pb-8">
              <p
                className={`font-medium ${
                  isCurrent
                    ? "text-indigo-600"
                    : isComplete
                    ? "text-slate-700"
                    : "text-slate-400"
                }`}
              >
                {stage.label}
              </p>
              {isCurrent && (
                <p className="text-xs text-slate-400 mt-0.5">Current stage</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GrievanceTimeline;