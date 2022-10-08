import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, RegistrationResponse } from "../authSlice";
import { RootState } from "../store";

export const AuthApiSlice = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
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
