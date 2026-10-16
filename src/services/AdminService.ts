import makeApiRequest from "./MakeApiRequest";
import { DASHBOARD_ENDPOINTS, STUDENT_ENDPOINTS } from "../constants/apiConstants";

export const getAdminDashboardStats = async (): Promise<any> => {
  const response = await makeApiRequest(DASHBOARD_ENDPOINTS.GET_ADMIN_DASHBOARD, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return  data;
};


export const getRecentStudentsApi = async (): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.GET_RECENT_STUDENTS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return  data;
};