import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDepartmentApi,
  deleteDepartmentApi,
  getDepartmentByIdApi,
  getDepartmentListApi,
  updateDepartmentApi,
} from "../../services/departmentService";
import { extractApiErrorMessage } from "../../utils/helpers/helperUtils";
import * as ErrorMessages from "../../constants/errorConstants";

export interface Department {
  id: number;
  name: string;
  code: string;
  students?: unknown[];
}

export interface DepartmentInput {
  name: string;
  code: string;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface DepartmentState {
  departments: Department[];
  listStatus: RequestStatus;
  detailStatus: RequestStatus;
  createStatus: RequestStatus;
  updateStatus: RequestStatus;
  deleteStatus: RequestStatus;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

const sliceName = "departments";

export const fetchDepartments = createAsyncThunk(
  `${sliceName}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDepartmentListApi();
      return response.data as Department[];
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_ALL_DEPARTMENTS,
        ),
      );
    }
  },
);

export const fetchDepartmentById = createAsyncThunk(
  `${sliceName}/fetchById`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getDepartmentByIdApi(id);
      return response.data as Department;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_FETCH_DEPARTMENT,
        ),
      );
    }
  },
);

export const createDepartment = createAsyncThunk(
  `${sliceName}/create`,
  async (data: DepartmentInput, { rejectWithValue }) => {
    try {
      const response = await createDepartmentApi(data);
      return response.message;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_CREATE_DEPARTMENT,
        ),
      );
    }
  },
);

export const updateDepartment = createAsyncThunk(
  `${sliceName}/update`,
  async (
    { id, data }: { id: string; data: DepartmentInput },
    { rejectWithValue },
  ) => {
    try {
      const response = await updateDepartmentApi(id, data);
      return response?.message;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_DELETE_DEPARTMENT,
        ),
      );
    }
  },
);

export const deleteDepartment = createAsyncThunk(
  `${sliceName}/delete`,
  async (id: number, { rejectWithValue }) => {
    try {
     const res =  await deleteDepartmentApi(id);
      return res.message;
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(
          error,
          ErrorMessages.ERR_FAILED_TO_DELETE_DEPARTMENT,
        ),
      );
    }
  },
);

const departmentSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to load departments.";
      })
      .addCase(fetchDepartmentById.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to load department.";
      })
      .addCase(createDepartment.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        if (action.payload?.id !== undefined) {
          state.departments.push(action.payload);
        }
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to create department.";
      })
      .addCase(updateDepartment.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.departments.findIndex(
          (department) => department.id === action.payload.id,
        );
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to update department.";
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.departments = state.departments.filter(
          (department) => department.id !== action.payload,
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "Unable to delete department.";
      });
  },
});

export default departmentSlice.reducer;
