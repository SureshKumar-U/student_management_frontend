import { AUTH_ENDPOINTS } from "../constants/apiConstants";
import type { ILogin } from "../Types";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";
import makeApiRequest from "./MakeApiRequest";
import * as ErrorMessages from "../constants/errorConstants";

export const loginApi = async (payload: ILogin): Promise<any> => {
  const response = await makeApiRequest(AUTH_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_LOGIN_FAILED),
    );
  }
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
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_REGISTER_FAILED),
    );
  }
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
  if (!response.ok)
    throw new Error(
      extractApiErrorMessage(
        data,
        ErrorMessages.ERR_FETCH_USERS_LIST(response.statusText),
      ),
    );
  return await data;
};
