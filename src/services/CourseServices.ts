import { COURSE_ENDPOINTS } from "../constants/apiConstants";
import makeApiRequest from "./MakeApiRequest";

export const getAllCoursesApi = async (): Promise<any> => {
  const response = await makeApiRequest(COURSE_ENDPOINTS.GET_ALL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
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
  return data;
};

