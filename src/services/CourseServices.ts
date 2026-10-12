import { COURSE_ENDPOINTS } from "../constants/apiConstants";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";
import makeApiRequest from "./MakeApiRequest";
import * as ErrorMessages from "../constants/errorConstants";

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

// export const getAllCoursesByStudentIdApi = async (
//   token: string,
//   userId: number,
// ): Promise<any> => {
//   const response = await fetch(`${BASEAPI_URL}/students/courses/${userId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Request failed");
//   }
//   return await response.json();
// };
