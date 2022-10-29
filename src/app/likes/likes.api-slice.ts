import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILikeCreate } from "../models/like/create.model";

export const LikesApiSlice = createApi({
  reducerPath: "likes-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/likes`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLike: builder.mutation<string, ILikeCreate>({
      query: (credentials) => ({
        url: "/add-like",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteLike: builder.mutation<string, string>({
      query: (id) => ({
        url: `/remove-like/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateLikeMutation, useDeleteLikeMutation } = LikesApiSlice;
