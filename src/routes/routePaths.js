

export const ROUTES = {
  HOME: "/",
  SUBMIT_GRIEVANCE: "/submit",
  GRIEVANCE_SUCCESS: "/submit/success",
  TRACK_GRIEVANCE: "/track",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_DASHBOARD: "/admin/dashboard",
  GRIEVANCE_DETAIL: "/admin/grievance/:ticketId",
};

export const buildGrievanceDetailPath = (ticketId) => {
  return `/admin/grievance/${ticketId}`;
};