import {
  COURSE_ENROLLEMENT,
  DASHBOARD_ENDPOINTS,
  STUDENT_ENDPOINTS,
} from "../constants/apiConstants";
import makeApiRequest from "./MakeApiRequest";

export const getAllStudentsApi = async (
  pageNo: number,
  pageSize: number,
): Promise<any> => {
  const queryParams = new URLSearchParams({
    pageNo: String(pageNo),
    pageSize: String(pageSize),
  });
  const response = await makeApiRequest(`${STUDENT_ENDPOINTS.GET_ALL}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getStudentApi = async (userId: string): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.GET_BY_ID(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const UpdateStudentApi = async ({
  studentId,
  payload,
}: {
  studentId: string;
  payload: any;
}): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.UPDATE(studentId), {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const deleteStudentById = async (studentId: number): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.DELETE(studentId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const addCourseToStudentApi = async (payload: any): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENROLLEMENT.ENROLL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getAllMyCoursesApi = async (
  userId: number,
  pageNo: number,
  pageSize: number,
): Promise<any> => {
  const queryParams = new URLSearchParams({
    pageNo: String(pageNo),
    pageSize: String(pageSize),
  });
  const response = await makeApiRequest(
    `${STUDENT_ENDPOINTS.GET_STUDENT_COURSES(userId)}?${queryParams}`,
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

export const getStudentDashboardData = async (userId: number): Promise<any> => {
  const response = await makeApiRequest(
    DASHBOARD_ENDPOINTS.GET_STUDENT_DASHBOARD(userId),
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
