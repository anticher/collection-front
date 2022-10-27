import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICollectionNameUpdate } from "../../models/ICollectionNameUpdate";
import { ICollection } from "../../models/ICollection";
import { ICollectionCreate } from "../../models/ICollectionCreate";
import { ICollectionDescriptionUpdate } from "../../models/ICollectionDescriptionUpdate";
import { ICollectionCustomFieldTitleUpdate } from "../../models/ICollectionCustomFieldTitleUpdate";
import { ICollectionCustomFieldDelete } from "../../models/ICollectionCustomFieldDelete";
import { ICollectionThemeUpdate } from "../../models/ICollectionThemeUpdate";
import { ICollectionDelete } from "../../models/ICollectionDelete";
import { ICollectionImageUpdate } from "../../models/ICollectionImageUpdate";
import { ICollectionLargest } from "../../models/ICollectionLargest";

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
