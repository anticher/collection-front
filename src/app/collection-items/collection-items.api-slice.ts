import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICollectionItemCustomFieldUpdate } from "../models/collection-item-custom-field/update.model";
import { ICollectionItem } from "../models/collection-item/collection-item.model";
import { ICollectionItemCreate } from "../models/collection-item/create.model";
import { ICollectionItemDelete } from "../models/collection-item/delete.model";
import { ICollectionItemImageUpdate } from "../models/collection-item/image-update.model";
import { ICollectionItemNameUpdate } from "../models/collection-item/name-update.model";
import { ICollectionItemTagsUpdate } from "../models/collection-item/tags-update.model";

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
    getLatestCollectionItems: builder.query<ICollectionItem[], number>({
      query: (count: number) => `latest/${count}`,
    }),
    searchCollectionItem: builder.query<ICollectionItem[], string>({
      query: (credentials) => ({
        url: `/search/${credentials}`,
        method: "GET",
      }),
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
  useGetLatestCollectionItemsQuery,
  useSearchCollectionItemQuery,
  useCreateCollectionItemMutation,
  useUpdateCollectionItemNameMutation,
  useUpdateCollectionItemTagsMutation,
  useUpdateCollectionItemImageMutation,
  useUpdateCollectionItemCustomFieldMutation,
  useDeleteCollectionItemMutation,
} = CollectionItemsApiSlice;
