import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SettingsState {
  theme: string;
  localization: string;
}

export const initialState: SettingsState = {
  theme: localStorage.getItem("theme") || "light",
  localization: localStorage.getItem("localization") || "en",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setLocalization: (state, action: PayloadAction<string>) => {
      state.localization = action.payload;
    },
  },
});

export const { setTheme, setLocalization } = settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLocalization = (state: RootState) => state.settings.localization;

export default settingsSlice.reducer;
