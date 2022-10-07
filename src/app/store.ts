import { configureStore } from '@reduxjs/toolkit'
// ...
import counterReducer from './testSlice'
import { collectionsApiSlice } from '../components/collections/collections.api-slice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [collectionsApiSlice.reducerPath]: collectionsApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(collectionsApiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch