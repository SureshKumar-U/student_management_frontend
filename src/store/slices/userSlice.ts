import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersApi } from "../../services/UserService";
import { extractApiErrorMessage } from "../../utils/helpers/helperUtils";
import * as ErrorMessages from "../../constants/errorConstants";

export interface User {
  id: number;
  name: string;
  role: "ADMIN" | "STUDENT" | "TEACHER";
  email: string;
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};
const sliceName = "users";

export const fetchUsers = createAsyncThunk(
  `${sliceName}/fetchUsers`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsersApi();
      return response.data as User[];
    } catch (error) {
      return rejectWithValue(
        extractApiErrorMessage(error, ErrorMessages.ERR_FAILED_TO_FETCH_USER),
      );
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? action.error.message ?? "Unable to load users.";
      });
  },
});

export default userSlice.reducer;
