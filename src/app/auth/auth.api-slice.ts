import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse } from "../models/auth/auth-response.model";
import { IRegistrationResponse } from "../models/auth/registration-response.model";

export const AuthApiSlice = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/auth`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => "/check-auth",
    }),
    sendLoginCredentials: builder.mutation<
      IAuthResponse,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendLogout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    sendRegistrationCredentials: builder.mutation<
      IRegistrationResponse,
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

export const {
  useCheckAuthQuery,
  useSendLoginCredentialsMutation,
  useSendRegistrationCredentialsMutation,
  useSendLogoutMutation
} = AuthApiSlice;
