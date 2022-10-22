import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICollectionItem } from "../../models/ICollectionItem";
import { ICollectionItemCreate } from "../../models/ICollectionItemCreate";
import { ICollectionItemCustomFieldUpdate } from "../../models/ICollectionItemCustomFieldUpdate";
import { ICollectionItemDelete } from "../../models/ICollectionItemDelete";
import { ICollectionItemImageUpdate } from "../../models/ICollectionItemImageUpdate";
import { ICollectionItemNameUpdate } from "../../models/ICollectionItemNameUpdate";
import { ICollectionItemTagsUpdate } from "../../models/ICollectionItemTagsUpdate";

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
    getCollectionItemById: builder.query<ICollectionItem, string | null>({
      query: (id: string) => `one-by-id/${id}`,
    }),
    createCollectionItem: builder.mutation<ICollectionItem, ICollectionItemCreate>({
      query: (credentials) => ({
        url: "/add-collection-item",
        method: "POST",
        body: credentials,
      }),
    }),
    updateCollectionItemName: builder.mutation<number, ICollectionItemNameUpdate>({
      query: (credentials) => ({
        url: '/update-name',
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionItemImage: builder.mutation<number, ICollectionItemImageUpdate>({
      query: (credentials) => ({
        url: '/update-image',
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionItemTags: builder.mutation<number, ICollectionItemTagsUpdate>({
      query: (credentials) => ({
        url: '/update-tags',
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionItemCustomField: builder.mutation<number, ICollectionItemCustomFieldUpdate>({
      query: (credentials) => ({
        url: '/update-custom-field',
        method: "PATCH",
        body: credentials,
      }),
    }),
    deleteCollectionItem: builder.mutation<ICollectionItem, ICollectionItemDelete>({
      query: (credentials) => ({
        url: '/delete-one',
        method: "DELETE",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetCollectionItemsQuery,
  useGetCollectionItemByIdQuery,
  useCreateCollectionItemMutation,
  useUpdateCollectionItemNameMutation,
  useUpdateCollectionItemTagsMutation,
  useUpdateCollectionItemImageMutation,
  useUpdateCollectionItemCustomFieldMutation,
  useDeleteCollectionItemMutation,
} = CollectionItemsApiSlice;
