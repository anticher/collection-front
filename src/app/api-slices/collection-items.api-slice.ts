import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICollectionItem } from "../../models/ICollectionItem";
import { ICollectionItemCreate } from "../../models/ICollectionItemCreate";

export const CollectionItemsApiSlice = createApi({
  reducerPath: "collection-items-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/collection-items`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getCollectionItems: builder.query<ICollectionItem[], string>({
      query: () => "/",
    }),
    createCollectionItem: builder.mutation<ICollectionItem, ICollectionItemCreate>({
      query: (credentials) => ({
        url: "/add-collection-item",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateCollectionItemMutation
} = CollectionItemsApiSlice;
