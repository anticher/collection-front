import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITheme } from "../../models/ITheme";
// import { ICollection } from "../../models/ICollection";
// import { ICollectionCreate } from "../../models/ICollectionCreate";
import { RootState } from "../store";

export const ThemesApiSlice = createApi({
  reducerPath: "themes-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/themes`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getThemes: builder.query<ITheme[], string>({
      query: () => "/",
    })
  }),
});

export const {
  useGetThemesQuery,
} = ThemesApiSlice;
