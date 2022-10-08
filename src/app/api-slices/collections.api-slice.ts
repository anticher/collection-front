import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICollection } from '../../models/ICollection'

export const collectionsApiSlice = createApi({
  reducerPath: 'collections-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/v1/collections' }),
  endpoints: builder => ({
    getCollections: builder.query<ICollection[], string>({
      query: () => '/'
    }),
    getCollectionsByUser: builder.query<ICollection[], string>({
      query: (name: string) => name
    }),
    getCollectionById: builder.query<ICollection, string>({
      query: (id: string) => `one-by-id${id}`
    })
  })
})

export const { useGetCollectionsQuery, useGetCollectionsByUserQuery, useGetCollectionByIdQuery } = collectionsApiSlice