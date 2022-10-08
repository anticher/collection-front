import { configureStore } from '@reduxjs/toolkit'
// ...
import counterReducer from './testSlice'
import authReducer from './authSlice'
import { collectionsApiSlice } from './api-slices/collections.api-slice'
import { AuthApiSlice } from './api-slices/auth.api-slice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    [collectionsApiSlice.reducerPath]: collectionsApiSlice.reducer,
    [AuthApiSlice.reducerPath]: AuthApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(collectionsApiSlice.middleware, AuthApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch