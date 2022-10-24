import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/IUser";

export const UsersApiSlice = createApi({
  reducerPath: "users-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/users`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/",
    }),
    setBlockedUsers: builder.mutation<void, { ids: string[] }>({
      query: (credentials) => ({
        url: "/set-block-status",
        method: "PUT",
        body: credentials,
      }),
    }),
    setUnblockedUsers: builder.mutation<void, { ids: string[] }>({
      query: (credentials) => ({
        url: "/remove-block-status",
        method: "PUT",
        body: credentials,
      }),
    }),
    setUsersAdminRole: builder.mutation<void, { ids: string[] }>({
      query: (credentials) => ({
        url: "/set-admin-status",
        method: "PUT",
        body: credentials,
      }),
    }),
    removeUsersAdminRole: builder.mutation<void, { ids: string[] }>({
      query: (credentials) => ({
        url: "/remove-admin-status",
        method: "PUT",
        body: credentials,
      }),
    }),
    removeUsers: builder.mutation<void, { ids: string[] }>({
        query: (credentials) => ({
          url: "/remove-users",
          method: "DELETE",
          body: credentials,
        }),
      }),
  }),
});

export const {
  useGetUsersQuery,
  useSetBlockedUsersMutation,
  useSetUnblockedUsersMutation,
  useSetUsersAdminRoleMutation,
  useRemoveUsersAdminRoleMutation,
  useRemoveUsersMutation
} = UsersApiSlice;
