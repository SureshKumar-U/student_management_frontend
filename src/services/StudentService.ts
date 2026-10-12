import { STUDENT_ENDPOINTS } from "../constants/apiConstants";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";
import makeApiRequest from "./MakeApiRequest";
import * as ErrorMessages from "../constants/errorConstants";

export const getAllStudentsApi = async (): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.GET_ALL, {
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
        ErrorMessages.ERR_FAILED_TO_FETCH_ALL_STUDENTS,
      ),
    );
  }
  return data;
};

export const getStudentByUserIdApi = async (userId: number): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.GET_BY_ID(userId), {
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
        ErrorMessages.ERR_FAILED_TO_FETCH_ALL_STUDENTS,
      ),
    );
  }
  return data;
};

export const getStudentApi = async (studentId: string): Promise<any> => {
  const response = await makeApiRequest(`/students/student/${studentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }

  return await response.json();
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
  if (!response.ok) {
    throw new Error(
      extractApiErrorMessage(data, ErrorMessages.ERR_FAILED_TO_UPDATE_STUDENT),
    );
  }
  return data;
};

export const deleteStudentById = async (
  studentId: number,
): Promise<any> => {
  const response = await makeApiRequest(STUDENT_ENDPOINTS.DELETE(studentId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
    const data = await response.json();
  if (!response.ok) {
    throw new Error(extractApiErrorMessage(data,ErrorMessages.ERR_FAILED_TO_DELETE_DEPARTMENT));
  }

  return data;
};


export const addCourseToStudentApi = async (payload: any): Promise<any> => {
  const response = await makeApiRequest(`/students/student_enrollment`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractApiErrorMessage(data, "Failed to enroll course"));
  }
  return data;
};

export const getAllMyCoursesApi = async (userId: number): Promise<any> => {
  const response = await makeApiRequest(`/students/courses/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractApiErrorMessage(data, "Request Failed"));
  }
  return data;
};

