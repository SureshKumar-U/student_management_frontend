import makeApiRequest from "./MakeApiRequest";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";
import * as ErrorMessages from "../constants/errorConstants";



const BASEAPI_URL = "http://localhost:5180/api/v1";

export const getAdminDashboardStats = async (token: string): Promise<any> => {
  const response = await makeApiRequest(`/admin/dashboard/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return await data;
};

export const getRecentStudentsApi = async (token: string): Promise<any> => {
  const response = await fetch(`${BASEAPI_URL}/students/recent`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return await data;
};



