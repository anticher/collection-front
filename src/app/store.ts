import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import settingsReducer from "./settings/settings.slice";
import { CollectionsApiSlice } from "./collections/collections.api-slice";
import { AuthApiSlice } from "./auth/auth.api-slice";
import { ThemesApiSlice } from "./themes/themes.api-slice";
import { CollectionItemsApiSlice } from "./collection-items/collection-items.api-slice";
import { TagsApiSlice } from "./tags/tags.api-slice";
import { ImageUploadApiSlice } from "./image-upload/image-upload.api-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [ImageUploadApiSlice.reducerPath]: ImageUploadApiSlice.reducer,
    [CollectionsApiSlice.reducerPath]: CollectionsApiSlice.reducer,
    [CollectionItemsApiSlice.reducerPath]: CollectionItemsApiSlice.reducer,
    [ThemesApiSlice.reducerPath]: ThemesApiSlice.reducer,
    [TagsApiSlice.reducerPath]: TagsApiSlice.reducer,
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ImageUploadApiSlice.middleware,
      CollectionsApiSlice.middleware,
      CollectionItemsApiSlice.middleware,
      ThemesApiSlice.middleware,
      TagsApiSlice.middleware,
      AuthApiSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
