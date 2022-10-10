import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
  username: string;
  userId: string;
  role: string;
}

export interface AuthResponse {
  username: string;
  userId: string;
  role: string;
}

export interface RegistrationResponse {
  username: string;
  email: string;
}

export const initialState: AuthState = {
  username: localStorage.getItem("username") || "",
  userId: localStorage.getItem("userId") || "",
  role: localStorage.getItem("role") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthResponse>) => {
      const { username, userId, role } = action.payload;
      state.role = role;
      state.userId = userId;
      state.username = username;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
