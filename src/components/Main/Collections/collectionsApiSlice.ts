import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const collectionsApiSlice = createApi({
  reducerPath: 'collections-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/v1/collections' }),
  endpoints: builder => ({
    getCollections: builder.query({
      query: () => '/'
    }),
    getCollectionsByUser: builder.query({
      query: (id: string) => id
    })
  })
})

export const { useGetCollectionsQuery, useGetCollectionsByUserQuery } = collectionsApiSlice