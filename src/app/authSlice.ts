import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
  accessToken: string;
  username: string;
  userId: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  username: string;
  userId: string;
  role: string;
}

export interface RegistrationResponse {
  username: string;
  email: string;
}

export const initialState: AuthState = {
  accessToken: "",
  username: "",
  userId: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthResponse>) => {
      const { username, userId, role, accessToken } = action.payload;
      console.log('dispatcher')
      state.accessToken = accessToken;
      state.role = role;
      state.userId = userId;
      state.username = username;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
