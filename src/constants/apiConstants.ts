export const API_BASE_URL = "http://localhost:5180/api/v1";

export const AUTH_ENDPOINTS = {
  LOGIN: `/auth/login`,
  REGISTER: `/auth/signup`,
  GET_ALL_USERS : `/auth/users`
};

export const COURSE_ENDPOINTS = {
  GET_ALL: "/courses",
  GET_BY_ID: (id: string | number) => `/courses/${id}`,
  CREATE: "/courses",
  UPDATE: (id: string | number) => `/courses/${id}`,
  DELETE: (id: string | number) => `/courses/${id}`,
};

export const DEPARTMENT_ENDPOINTS = {
  GET_ALL: "/departments",
  GET_BY_ID: (id: string ) => `/departments/${id}`,
  CREATE: "/departments",
  UPDATE: (id: string | number) => `/departments/${id}`,
  DELETE: (id: string | number) => `/departments/${id}`,
};

export const STUDENT_ENDPOINTS = {
  GET_ALL: "/students",
  GET_BY_ID: (id: string ) => `/students/${id}`,
  CREATE: "/students",
  GET_DASHBOARD_DATA :(id:number)=> `/students/student_dashboard/${id}`,
  UPDATE: (id: string | number) => `/students/${id}`,
  DELETE: (id: string | number) => `/students/${id}`,
};


export const COURSE_ENROLLEMENT = {
  ENROLL: "/student_enrollment"
}


