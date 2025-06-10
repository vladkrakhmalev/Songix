import { createApi } from '@reduxjs/toolkit/query/react'
import { ICollection, ICollectionBase } from '../model/collectionType'
import { baseQuery } from '@shared/api'

export interface IUpdateCollectionRequest {
  id: number
  data: Partial<ICollectionBase>
}

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: baseQuery,
  tagTypes: ['collections'],
  endpoints: builder => ({
    getCollections: builder.query<ICollection[], number | void>({
      query: limit => ({
        url: '/collections',
        params: { limit },
      }),
      providesTags: ['collections'],
    }),
    getCollection: builder.query<ICollection, number>({
      query: id => ({
        url: `/collections/${id}`,
      }),
      providesTags: (_, __, id) => [{ type: 'collections', id }],
    }),
    addCollection: builder.mutation<ICollection, string>({
      query: title => ({
        url: '/collections',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['collections'],
    }),
    updateCollection: builder.mutation<ICollection, IUpdateCollectionRequest>({
      query: ({ id, data }) => ({
        url: `/collections/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['collections'],
    }),
    deleteCollection: builder.mutation<ICollection, number>({
      query: id => ({
        url: `/collections/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['collections'],
    }),
  }),
})
