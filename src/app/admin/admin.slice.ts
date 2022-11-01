import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface IAdminState {
  checkedIds: string[];
}

export const initialState: IAdminState = {
  checkedIds: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCheckedIds: (state, action: PayloadAction<string[]>) => {
      state.checkedIds = action.payload;
    },
  },
});

export const { setCheckedIds } = adminSlice.actions;

export const selectCheckedIds = (state: RootState) => state.admin.checkedIds;

export default adminSlice.reducer;
