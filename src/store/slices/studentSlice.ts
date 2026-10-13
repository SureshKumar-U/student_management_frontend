import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCourseToStudentApi,
  getAllMyCoursesApi,
  getStudentDashboardData,
  getAllStudentsApi,
  UpdateStudentApi,
  deleteStudentById,
  getStudentApi,
} from "../../services/StudentService";
import { extractApiErrorMessage } from "../../utils/helpers/helperUtils";
import * as ErrorMessages from "../../constants/errorConstants";

export interface Student {
  id: number | string;
  name?: string;
  email?: string;
  phone?: string;
  departmentId?: number | string;
  department?: { id?: number | string; name: string } | string;
}

export interface StudentUpdateInput {
  name: string;
  email: string;
  phone?: string;
  departmentId?: number | string;
  department?: string;
  studentId?: string;
}

export interface EnrolledCourse {
  id: number;
  code: string;
  name: string;
  department?: { id?: number | string; name: string } | string;
}

interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  dashboardDetails: any;
  courses: EnrolledCourse[];
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  coursesStatus: "idle" | "loading" | "succeeded" | "failed";
  enrollmentStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  selectedStudent: null,
  dashboardDetails: null,
  courses: [],
  listStatus: "idle",
  detailStatus: "idle",
  updateStatus: "idle",
  coursesStatus: "idle",
  enrollmentStatus: "idle",
  error: null,
};

const sliceName: string = "students";

export const fetchStudentDashboardDetails = createAsyncThunk(
  `${sliceName}/fetchStudentDashboard`,
  async (userId :number, { rejectWithValue }) => {
    try {
      const response = await getStudentDashboardData(userId);
  
      if (!response?.data) {
        return rejectWithValue("Student was not found.");
      }
      return response.data as Student;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_STUDENT,
        ),
      );
    }
  },
);

export const fetchStudentById = createAsyncThunk(
  `${sliceName}/fetchById`,
  async (studentId: number, { rejectWithValue }) => {
    try {
      const response = await getStudentApi(studentId);
      if (!response?.data) {
        return rejectWithValue("Student was not found.");
      }
      return response.data as Student;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_STUDENT,
        ),
      );
    }
  },
);

export const updateStudent = createAsyncThunk(
  `${sliceName}/update`,
  async (
    { studentId, payload }: { studentId: string; payload: StudentUpdateInput },
    { rejectWithValue },
  ) => {
    try {
      return await UpdateStudentApi({ payload, studentId });
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_UPDATE_STUDENT,
        ),
      );
    }
  },
);

export const deleteStudent = createAsyncThunk(
  `${sliceName}/delete`,
  async (studentId: number, { rejectWithValue }) => {
    try {
      const response = await deleteStudentById(studentId);
      return response?.message;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_UPDATE_STUDENT,
        ),
      );
    }
  },
);

export const fetchMyCourses = createAsyncThunk(
  `${sliceName}/fetchMyCourses`,
  async ({ userId }: { userId: number }, { rejectWithValue }) => {
    try {
      const response = await getAllMyCoursesApi(userId);
      return (response.data ?? []) as EnrolledCourse[];
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_STUDENT_COURSES,
        ),
      );
    }
  },
);

export const enrollStudentInCourse = createAsyncThunk(
  `${sliceName}/enrollInCourse`,
  async (
    { userId, courseId }: { userId: number; courseId: number | string },
    { rejectWithValue },
  ) => {
    try {
      return await addCourseToStudentApi({ userId, courseId });
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_ENROLL_STUDENT,
        ),
      );
    }
  },
);

export const getAllStudents = createAsyncThunk(
  `${sliceName}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllStudentsApi();
      return response.data as Student[];
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_ALL_STUDENTS,
        ),
      );
    }
  },
);

const studentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to load students.";
      })
      .addCase(fetchStudentDashboardDetails.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchStudentDashboardDetails.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.dashboardDetails = action.payload;
      })
      .addCase(fetchStudentDashboardDetails.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to load student.";
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to load student.";
      })
      .addCase(updateStudent.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to update student.";
      })
      .addCase(fetchMyCourses.pending, (state) => {
        state.coursesStatus = "loading";
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.coursesStatus = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.coursesStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to load enrolled courses.";
      })
      .addCase(enrollStudentInCourse.pending, (state) => {
        state.enrollmentStatus = "loading";
        state.error = null;
      })
      .addCase(enrollStudentInCourse.fulfilled, (state) => {
        state.enrollmentStatus = "succeeded";
      })
      .addCase(enrollStudentInCourse.rejected, (state, action) => {
        state.enrollmentStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to enroll in course.";
      });
  },
});

export default studentSlice.reducer;
