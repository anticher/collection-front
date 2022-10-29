import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface ICollectionItemsState {
  isCreateModalVisible: boolean;
  isUpdateModalVisible: boolean;
  isModalSpinnerVisible: boolean;
  updatedCollectionItemId: string;
}

export const initialState: ICollectionItemsState = {
  isCreateModalVisible: false,
  isUpdateModalVisible: false,
  isModalSpinnerVisible: false,
  updatedCollectionItemId: "",
};

export const collectionItemSlice = createSlice({
  name: "collection-items",
  initialState,
  reducers: {
    setCollectionItemCreateModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalVisible = action.payload;
    },
    setCollectionItemUpdateModalVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isUpdateModalVisible = action.payload;
    },
    setCollectionItemModalSpinnerVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isModalSpinnerVisible = action.payload;
    },
    setUpdatedCollectionItemId: (state, action: PayloadAction<string>) => {
      state.updatedCollectionItemId = action.payload;
    },
  },
});

export const {
  setCollectionItemCreateModalVisibility,
  setCollectionItemUpdateModalVisibility,
  setCollectionItemModalSpinnerVisibility,
  setUpdatedCollectionItemId,
} = collectionItemSlice.actions;

export const selectCollectionItemCreateModalVisibility = (state: RootState) =>
  state.collectionItems.isCreateModalVisible;
export const selectCollectionItemUpdateModalVisibility = (state: RootState) =>
  state.collectionItems.isUpdateModalVisible;
export const selectCollectionModalSpinnerVisibility = (state: RootState) =>
  state.collectionItems.isModalSpinnerVisible;
export const selectUpdatedCollectionItemId = (state: RootState) =>
  state.collectionItems.updatedCollectionItemId;

export default collectionItemSlice.reducer;
