import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routePaths";
import Layout from "../components/common/Layout";
import GrievanceSuccessPage from "../pages/GrievanceSuccessPage";
import HomePage from "../pages/HomePage";
import SubmitGrievancePage from "../pages/SubmitGrievancePage";
import TrackGrievancePage from "../pages/TrackGrievancePage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import GrievanceDetailPage from "../pages/GrievanceDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SUBMIT_GRIEVANCE} element={<SubmitGrievancePage />} />
        <Route path={ROUTES.GRIEVANCE_SUCCESS} element={<GrievanceSuccessPage />} />
        <Route path={ROUTES.TRACK_GRIEVANCE} element={<TrackGrievancePage />} />
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
          <Route path={ROUTES.GRIEVANCE_DETAIL} element={<GrievanceDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;