import { AUTH_ENDPOINTS } from "../constants/apiConstants";
import type { ILogin } from "../Types";
import makeApiRequest from "./MakeApiRequest";

export const loginApi = async (payload: ILogin): Promise<any> => {
  const response = await makeApiRequest(AUTH_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const signUpApi = async (payload: any): Promise<any> => {
  const response = await makeApiRequest(AUTH_ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getAllUsersApi = async (): Promise<any> => {
  const response = await makeApiRequest(AUTH_ENDPOINTS.GET_ALL_USERS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
