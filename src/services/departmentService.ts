import { DEPARTMENT_ENDPOINTS } from "../constants/apiConstants";
import makeApiRequest from "./MakeApiRequest";

export const getDepartmentListApi = async (): Promise<any> => {
  const response = await makeApiRequest(DEPARTMENT_ENDPOINTS.GET_ALL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
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
  return data;
};
