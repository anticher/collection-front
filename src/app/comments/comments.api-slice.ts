import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment } from "../../models/IComment";
import { ICommentCreate } from "../../models/ICommentCreate";

export const CommentsApiSlice = createApi({
  reducerPath: "comments-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/comments`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getCommentsByCollectionItem: builder.query<IComment[], string | null>({
      query: (id: string) => `by-collection-item-id/${id}`,
    }),
    createComment: builder.mutation<string, ICommentCreate>({
      query: (credentials) => ({
        url: "/add-comment",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {useGetCommentsByCollectionItemQuery, useCreateCommentMutation} = CommentsApiSlice;
