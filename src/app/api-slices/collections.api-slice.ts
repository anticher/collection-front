import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICollection } from "../../models/ICollection";
import { ICollectionCreate } from "../../models/ICollectionCreate";
import { RootState } from "../store";

export const CollectionsApiSlice = createApi({
  reducerPath: "collections-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/collections`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCollections: builder.query<ICollection[], string>({
      query: () => "/",
    }),
    getCollectionsByUser: builder.query<ICollection[], string>({
      query: (name: string) => name,
    }),
    getCollectionById: builder.query<ICollection, string>({
      query: (id: string) => `one-by-id${id}`,
    }),
    createCollection: builder.mutation<ICollection, ICollectionCreate>({
      query: (credentials) => ({
        url: "/add-collection",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
  useGetCollectionByIdQuery,
  useCreateCollectionMutation
} = CollectionsApiSlice;
