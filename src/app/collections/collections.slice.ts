import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ICollectionsState {
  isCreateModalVisible: boolean;
  isUpdateModalVisible: boolean;
  isModalSpinnerVisible: boolean;
  updatedCollectionId: string;
}

export const initialState: ICollectionsState = {
  isCreateModalVisible: false,
  isUpdateModalVisible: false,
  isModalSpinnerVisible: false,
  updatedCollectionId: "",
};

export const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollectionModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalVisible = action.payload;
    },
    setCollectionUpdateModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isUpdateModalVisible = action.payload;
    },
    setCollectionModalSpinnerVisibility: (state, action: PayloadAction<boolean>) => {
      state.isModalSpinnerVisible = action.payload;
    },
    setUpdatedCollectionId: (state, action: PayloadAction<string>) => {
      state.updatedCollectionId = action.payload;
    },
  },
});

export const { setCollectionModalVisibility, setCollectionUpdateModalVisibility, setCollectionModalSpinnerVisibility, setUpdatedCollectionId } = collectionSlice.actions;

export const selectCollectionModalVisibility = (state: RootState) => state.collections.isCreateModalVisible;
export const selectCollectionUpdateModalVisibility = (state: RootState) => state.collections.isUpdateModalVisible;
export const selectCollectionModalSpinnerVisibility = (state: RootState) => state.collections.isModalSpinnerVisible;
export const selectUpdatedCollectionId = (state: RootState) => state.collections.updatedCollectionId


export default collectionSlice.reducer;
