import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAdminDashboardStats,
  getRecentStudentsApi,
} from "../../services/AdminService";
import { extractApiErrorMessage } from "../../utils/helpers/helperUtils";
import * as ErrorMessages from "../../constants/errorConstants";

export interface AdminDashboardStats {
  [key: string]: string | number;
}

export interface RecentStudent {
  email: string;
  department: string;
  name: string;
}

interface AdminDashboardState {
  stats: AdminDashboardStats;
  recentStudents: RecentStudent[];
  statsStatus: "idle" | "loading" | "succeeded" | "failed";
  recentStudentsStatus: "idle" | "loading" | "succeeded" | "failed";
  statsError: string | null;
  recentStudentsError: string | null;
}

const initialState: AdminDashboardState = {
  stats: {},
  recentStudents: [],
  statsStatus: "idle",
  recentStudentsStatus: "idle",
  statsError: null,
  recentStudentsError: null,
};

const sliceName = "adminDashboard";

export const fetchAdminDashboardStats = createAsyncThunk<
  AdminDashboardStats,
  void,
  { rejectValue: string }
>(`${sliceName}/fetchStats`, async (_, { rejectWithValue }) => {
  try {
    const response = await getAdminDashboardStats();
    return response.data as AdminDashboardStats;
  } catch (error) {
    return rejectWithValue(
      extractApiErrorMessage(
        error,
        ErrorMessages.ERR_FAILED_TO_FETCH_ADMIN_DASHBOARD_STATS,
      ),
    );
  }
});

export const fetchRecentStudents = createAsyncThunk<
  RecentStudent[],
  void,
  { rejectValue: string }
>(`${sliceName}/fetchRecentStudents`, async (_, { rejectWithValue }) => {
  try {
    const response = await getRecentStudentsApi();
    return response.data;
  } catch (error) {
    return rejectWithValue(
      extractApiErrorMessage(
        error,
        ErrorMessages.ERR_FAILED_TO_FETCH_RECENT_STUDENTS,
      ),
    );
  }
});

const adminSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboardStats.pending, (state) => {
        state.statsStatus = "loading";
        state.statsError = null;
      })
      .addCase(fetchAdminDashboardStats.fulfilled, (state, action) => {
        state.statsStatus = "succeeded";
        state.stats = action.payload;
      })
      .addCase(fetchAdminDashboardStats.rejected, (state, action) => {
        state.statsStatus = "failed";
        state.statsError =
          action.payload ??
          action.error.message ??
          "Unable to load statistics.";
      })
      .addCase(fetchRecentStudents.pending, (state) => {
        state.recentStudentsStatus = "loading";
        state.recentStudentsError = null;
      })
      .addCase(fetchRecentStudents.fulfilled, (state, action) => {
        state.recentStudentsStatus = "succeeded";
        state.recentStudents = action.payload;
      })
      .addCase(fetchRecentStudents.rejected, (state, action) => {
        state.recentStudentsStatus = "failed";
        state.recentStudentsError =
          action.payload ??
          action.error.message ??
          "Unable to load recent students.";
      });
  },
});

export default adminSlice.reducer;
