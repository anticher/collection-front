import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITag } from "../../models/ITag";

export const TagsApiSlice = createApi({
  reducerPath: "tags-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/tags`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTags: builder.query<ITag[], void>({
      query: () => "/",
    }),
    getTagByName: builder.query<ITag, string | null>({
      query: (name: string) => `one-by-name/${name}`,
    }),
  }),
});

export const { useGetTagsQuery, useGetTagByNameQuery } = TagsApiSlice;
