import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthResponse } from "../../models/IAuthResponse";
import type { RootState } from "../store";

export interface IAuthState {
  username: string;
  userId: string;
  role: string;
}

export const initialState: IAuthState = {
  username: localStorage.getItem("username") || "",
  userId: localStorage.getItem("userId") || "",
  role: localStorage.getItem("role") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IAuthResponse>) => {
      const { username, userId, role } = action.payload;
      state.role = role;
      state.userId = userId;
      state.username = username;
    },
  },
});

export const { setAuthData } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;
