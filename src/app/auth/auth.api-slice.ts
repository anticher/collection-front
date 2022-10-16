import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse } from "../../models/IAuthResponse";
import { IRegistrationResponse } from "../../models/IRegistrationResponse";

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
  useSendLoginCredentialsMutation,
  useSendRegistrationCredentialsMutation,
  useSendLogoutMutation
} = AuthApiSlice;
