import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCourseApi,
  deleteCourseApi,
  getAllCoursesApi,
  getCourseByIdApi,
  updateCourseApi,
} from "../../services/CourseServices";
import { extractApiErrorMessage } from "../../utils/helpers/helperUtils";
import * as ErrorMessages from "../../constants/errorConstants";

export interface Course {
  id: number;
  code: string;
  name: string;
  departmentId?: number | string;
  departmentName?: string;
}

export interface CourseInput {
  code: string;
  name: string;
  departmentId: number | string;
}

interface CourseState {
  courses: Course[];
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: CourseState = {
  courses: [],
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

const sliceName = "courses";

export const fetchAllCourses = createAsyncThunk(
  `${sliceName}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCoursesApi();
      return response.data as Course[];
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_ALL_COURSES,
        ),
      );
    }
  },
);

export const fetchCourseById = createAsyncThunk(
  `${sliceName}/fetchById`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getCourseByIdApi(id);
      if (!response?.data) {
        return rejectWithValue("Course was not found.");
      }
      return response.data as Course;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(error, ErrorMessages.ERR_FAILED_TO_FETCH_COURSE),
      );
    }
  },
);

export const createCourse = createAsyncThunk(
  `${sliceName}/create`,
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createCourseApi(data);
      return response.data as Course;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_CREATE_COURSE,
        ),
      );
    }
  },
);

export const updateCourse = createAsyncThunk(
  `${sliceName}/update`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await updateCourseApi(payload.id, payload.data);
      return response.message;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_UPDATE_COURSE,
        ),
      );
    }
  },
);

export const deleteCourse = createAsyncThunk(
  `${sliceName}/delete`,
  async (id: number, { rejectWithValue }) => {
    try {
      const res: any = await deleteCourseApi(id);
      return res.message;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unable to delete course.",
      );
    }
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load courses.";
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load course.";
      })
      .addCase(createCourse.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        if (action.payload?.id !== undefined) {
          state.courses.push(action.payload);
        }
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to create course.";
      })
      .addCase(updateCourse.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.courses.findIndex(
          (course) => course.id === action.payload.id,
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to update course.";
      })
      .addCase(deleteCourse.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload,
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to delete course.";
      });
  },
});

export default courseSlice.reducer;
