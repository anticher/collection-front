import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITheme } from "../models/theme/theme.model";

export const ThemesApiSlice = createApi({
  reducerPath: "themes-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/themes`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getThemes: builder.query<ITheme[], string>({
      query: () => "/",
    }),
  }),
});

export const { useGetThemesQuery } = ThemesApiSlice;
