import { DEPARTMENT_ENDPOINTS } from "../constants/apiConstants";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";
import makeApiRequest from "./MakeApiRequest";
import * as ErrorMessages from "../constants/errorConstants";

export const getDepartmentListApi = async (): Promise<any> => {
  const response = await makeApiRequest(DEPARTMENT_ENDPOINTS.GET_ALL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(
        data,
        ErrorMessages.ERR_FAILED_TO_FETCH_ALL_DEPARTMENTS,
      ),
    );
  }
  return await data;
};

export const getDepartmentByIdApi = async (
  departmentId: string,
): Promise<any> => {
  const response = await makeApiRequest(
    DEPARTMENT_ENDPOINTS.GET_BY_ID(departmentId),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(
        data,
        ErrorMessages.ERR_FAILED_TO_FETCH_DEPARTMENT,
      ),
    );
  }
  return data;
};

export const updateDepartmentApi = async (
  departmentId: string,
  payload: any,
): Promise<any> => {
  const response = await makeApiRequest(
    DEPARTMENT_ENDPOINTS.UPDATE(departmentId),
    {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(
        data,
        ErrorMessages.ERR_FAILED_TO_UPDATE_DEPARTMENT,
      ),
    );
  }
  return data;
};

export const createDepartmentApi = async (payload: any): Promise<any> => {
  const response = await makeApiRequest(DEPARTMENT_ENDPOINTS.CREATE, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(
        data,
        ErrorMessages.ERR_FAILED_TO_CREATE_DEPARTMENT,
      ),
    );
  }
  return data;
};

export const deleteDepartmentApi = async (
  departmentId: number,
): Promise<any> => {
  const response = await makeApiRequest(
    DEPARTMENT_ENDPOINTS.DELETE(departmentId),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(
        data,
        ErrorMessages.ERR_FAILED_TO_DELETE_DEPARTMENT,
      ),
    );
  }
  return data;
};
