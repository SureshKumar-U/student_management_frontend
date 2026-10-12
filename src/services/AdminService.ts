import makeApiRequest from "./MakeApiRequest";
import {
  COURSE_ENDPOINTS,
  DEPARTMENT_ENDPOINTS,
} from "../constants/apiConstants";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";
import * as ErrorMessages from "../constants/errorConstants";

const BASEAPI_URL = "http://localhost:5180/api/v1";

export const getAllCoursesApi = async (): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENDPOINTS.GET_ALL, {
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
        ErrorMessages.ERR_FAILED_TO_FETCH_ALL_COURSES,
      ),
    );
  }
  return data;
};

export const deleteStudentById = async (
  token: string,
  studentId: number,
): Promise<any> => {
  const response = await fetch(`${BASEAPI_URL}/students/${studentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Request failed");
  }

  return await response.json();
};

export const getAllStudents = async (token: string): Promise<any> => {
  const response = await fetch(`${BASEAPI_URL}/students`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Request failed");
  }

  return await response.json();
};

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

export const getAdminDashboardStats = async (token: string): Promise<any> => {
  const response = await fetch(`${BASEAPI_URL}/admin/dashboard/stats`, {
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

export const getAllDepartmentsApi = async (token: string): Promise<any> => {
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

  return data;
};

export const createCourseApi = async (payload: any): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENDPOINTS.CREATE, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_FAILED_TO_CREATE_COURSE),
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
  console.log(data)
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

export const deleteCourseApi = async (courseId: number): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENDPOINTS.DELETE(courseId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_FAILED_TO_DELETE_COURSE),
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

export const getCourseByIdApi = async (courseId: string): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENDPOINTS.GET_BY_ID(courseId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_FAILED_TO_FETCH_COURSE),
    );
  }
  return data;
};

export const updateCourseApi = async (
  id: string,
  payload: any,
): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENDPOINTS.UPDATE(id), {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_FAILED_TO_UPDATE_COURSE),
    );
  }
  return data;
};
