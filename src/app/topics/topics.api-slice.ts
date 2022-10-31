import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITopic } from "../models/topic/topic.model";

export const TopicsApiSlice = createApi({
  reducerPath: "topics-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/topics`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getTopics: builder.query<ITopic[], void>({
      query: () => "/",
    }),
  }),
});

export const { useGetTopicsQuery } = TopicsApiSlice;
