import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICollectionCustomFieldTitleUpdate } from "../models/collection-custom-field/custom-field-title-update.model";
import { ICollectionCustomFieldDelete } from "../models/collection-custom-field/delete.model";
import { ICollectionLargest } from "../models/collection/collection-largest.model";
import { ICollection } from "../models/collection/collection.model";
import { ICollectionCreate } from "../models/collection/create.model";
import { ICollectionDelete } from "../models/collection/delete.model";
import { ICollectionDescriptionUpdate } from "../models/collection/description-update.model";
import { ICollectionImageUpdate } from "../models/collection/image-update.model";
import { ICollectionNameUpdate } from "../models/collection/name-update.model";
import { ICollectionThemeUpdate } from "../models/collection/theme-update.model";

export const CollectionsApiSlice = createApi({
  reducerPath: "collections-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}v1/collections`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getCollections: builder.query<ICollection[], string>({
      query: () => "/",
    }),
    getCollectionsByUser: builder.query<ICollection[], string>({
      query: (name: string) => name,
    }),
    getCollectionById: builder.query<ICollection, string | null>({
      query: (id: string) => `one-by-id/${id}`,
    }),
    getLargestCollections: builder.query<ICollectionLargest[], number>({
      query: (count: number) => `largest/${count}`,
    }),
    searchCollection: builder.query<ICollection[], string>({
      query: (credentials) => ({
        url: `/search/${credentials}`,
        method: "GET",
      }),
    }),
    createCollection: builder.mutation<ICollection, ICollectionCreate>({
      query: (credentials) => ({
        url: "/add-collection",
        method: "POST",
        body: credentials,
      }),
    }),
    updateCollectionDescription: builder.mutation<number, ICollectionDescriptionUpdate>({
      query: (credentials) => ({
        url: '/update-collection-description',
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionName: builder.mutation<number, ICollectionNameUpdate>({
      query: (credentials) => ({
        url: '/update-collection-name',
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionImage: builder.mutation<number, ICollectionImageUpdate>({
      query: (credentials) => ({
        url: '/update-collection-image',
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionTheme: builder.mutation<number, ICollectionThemeUpdate>({
      query: (credentials) => ({
        url: "/update-collection-theme",
        method: "PATCH",
        body: credentials,
      }),
    }),
    updateCollectionCustomFieldTitle: builder.mutation<number, ICollectionCustomFieldTitleUpdate>({
      query: (credentials) => ({
        url: '/update-collection-custom-field-title',
        method: "PATCH",
        body: credentials,
      }),
    }),
    deleteCollectionCustomField: builder.mutation<ICollection, ICollectionCustomFieldDelete>({
      query: (credentials) => ({
        url: '/delete-collection-custom-field',
        method: "DELETE",
        body: credentials,
      }),
    }),
    deleteCollection: builder.mutation<ICollection, ICollectionDelete>({
      query: (credentials) => ({
        url: '/delete-collection',
        method: "DELETE",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
  useGetCollectionByIdQuery,
  useGetLargestCollectionsQuery,
  useSearchCollectionQuery,
  useCreateCollectionMutation,
  useUpdateCollectionDescriptionMutation,
  useUpdateCollectionNameMutation,
  useUpdateCollectionCustomFieldTitleMutation,
  useDeleteCollectionCustomFieldMutation,
  useUpdateCollectionThemeMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionImageMutation,
} = CollectionsApiSlice;
