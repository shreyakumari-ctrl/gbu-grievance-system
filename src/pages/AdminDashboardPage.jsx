
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiClipboard, FiClock, FiLoader, FiCheckCircle, FiSearch, FiLogOut } from "react-icons/fi";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import StatCard from "../components/admin/StatCard";
import GrievanceTable from "../components/admin/GrievanceTable";
import { useGrievances } from "../context/GrievanceContext";
import { useAuth } from "../context/AuthContext";
import { ROUTES, buildGrievanceDetailPath } from "../routes/routePaths";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

function AdminDashboardPage() {
  const navigate = useNavigate();
  const { grievances, updateGrievanceStatus } = useGrievances();
  const { logout } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Simulates a brief loading delay - mimics what a real API call would
  // feel like, and keeps this UI pattern ready for when localStorage is
  // eventually swapped for a real backend fetch.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Recalculates stats only when "grievances" actually changes.
  const stats = useMemo(() => {
    return {
      total: grievances.length,
      pending: grievances.filter((g) => g.status === "Pending").length,
      inProgress: grievances.filter((g) => g.status === "In Progress").length,
      resolved: grievances.filter((g) => g.status === "Resolved").length,
    };
  }, [grievances]);

  // Recalculates the filtered + searched + sorted list only when one of
  // its 4 dependencies actually changes.
  const visibleGrievances = useMemo(() => {
    let result = [...grievances];

    if (statusFilter !== "all") {
      result = result.filter((g) => g.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (g) =>
          g.ticketId.toLowerCase().includes(term) ||
          g.name.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.submittedAt).getTime();
      const dateB = new Date(b.submittedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [grievances, statusFilter, searchTerm, sortOrder]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const handleViewDetails = (ticketId) => {
    navigate(buildGrievanceDetailPath(ticketId));
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500">Manage and track all student grievances</p>
          </div>
          <Button variant="secondary" onClick={handleLogout} className="flex items-center gap-2">
            <FiLogOut aria-hidden="true" /> Logout
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FiClipboard} label="Total Complaints" value={stats.total} colorClass="bg-indigo-100 text-indigo-600" />
          <StatCard icon={FiClock} label="Pending" value={stats.pending} colorClass="bg-amber-100 text-amber-600" />
          <StatCard icon={FiLoader} label="In Progress" value={stats.inProgress} colorClass="bg-blue-100 text-blue-600" />
          <StatCard icon={FiCheckCircle} label="Resolved" value={stats.resolved} colorClass="bg-green-100 text-green-600" />
        </div>

        <Card className="mb-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              name="search"
              placeholder="Search by Ticket ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={filterOptions}
            />
            <Select
              name="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              options={sortOptions}
            />
          </div>
        </Card>

        <Card>
          {isLoading ? (
            <div className="py-16 text-center text-slate-400">
              <FiLoader className="text-3xl animate-spin mx-auto mb-3" aria-hidden="true" />
              <p>Loading grievances...</p>
            </div>
          ) : grievances.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <FiSearch className="text-4xl mx-auto mb-3" aria-hidden="true" />
              <p className="text-lg font-medium">No grievances submitted yet</p>
            </div>
          ) : (
            <GrievanceTable
              grievances={visibleGrievances}
              onStatusChange={updateGrievanceStatus}
              onViewDetails={handleViewDetails}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboardPage;