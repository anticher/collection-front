import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import settingsReducer from "./slices/settings.slice";
import { CollectionsApiSlice } from "./api-slices/collections.api-slice";
import { AuthApiSlice } from "./api-slices/auth.api-slice";
import { ThemesApiSlice } from "./api-slices/themes.api-slice";
import { CollectionItemsApiSlice } from "./api-slices/collection-items.api-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [CollectionsApiSlice.reducerPath]: CollectionsApiSlice.reducer,
    [CollectionItemsApiSlice.reducerPath]: CollectionItemsApiSlice.reducer,
    [ThemesApiSlice.reducerPath]: ThemesApiSlice.reducer,
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CollectionsApiSlice.middleware,
      CollectionItemsApiSlice.middleware,
      ThemesApiSlice.middleware,
      AuthApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
