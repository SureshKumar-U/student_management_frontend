import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {  Roles, User } from "../../Types";
import { LoginApi, SignUpApi } from "../../services/UserService";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({email,password}: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await LoginApi({ email, password });
      const user  = response.data;
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unable to log in",
      );
    }
  },
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({name, email, password, role}: { name: string; email: string; password: string; role: Roles }, { rejectWithValue }) => {
    try {
      const response = await SignUpApi({ name, email, password, role });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unable to sign up",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unable to log in";
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unable to sign up";
      });
  },
},
);

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
