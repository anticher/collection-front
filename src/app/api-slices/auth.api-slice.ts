import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, RegistrationResponse } from "../auth.slice";

export const AuthApiSlice = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/auth`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    sendLoginCredentials: builder.mutation<
      AuthResponse,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendRegistrationCredentials: builder.mutation<
    RegistrationResponse,
      { username: string; email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/registration",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSendLoginCredentialsMutation, useSendRegistrationCredentialsMutation } = AuthApiSlice;
