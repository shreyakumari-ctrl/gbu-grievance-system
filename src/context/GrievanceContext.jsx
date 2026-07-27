import { createContext, useContext, useState, useEffect } from "react";
import { loadGrievances, saveGrievances } from "../utils/grievanceStorage";

const GrievanceContext = createContext(null);

export function GrievanceProvider({ children }) {

  const [grievances, setGrievances] = useState(() => loadGrievances());

  useEffect(() => {
    saveGrievances(grievances);
  }, [grievances]);

  const addGrievance = (grievance) => {
    setGrievances((prev) => [...prev, grievance]);
  };

  const updateGrievanceStatus = (ticketId, newStatus) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.ticketId === ticketId ? { ...g, status: newStatus } : g
      )
    );
  };

  const getGrievanceByTicketId = (ticketId) => {
    return grievances.find((g) => g.ticketId === ticketId);
  };

  const value = {
    grievances,
    addGrievance,
    updateGrievanceStatus,
    getGrievanceByTicketId,
  };

  return (
    <GrievanceContext.Provider value={value}>
      {children}
    </GrievanceContext.Provider>
  );
}

export function useGrievances() {
  const context = useContext(GrievanceContext);

  if (!context) {
    throw new Error("useGrievances must be used within a GrievanceProvider");
  }

  return context;
}