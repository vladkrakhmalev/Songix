import { createApi } from '@reduxjs/toolkit/query/react'
import { ISong, TSongWithoutId } from '../model/songType'
import { IUpdateSongRequest } from './songApi.types'
import { convertKeys } from '@shared/utils/convert-case'
import { baseQuery } from '@shared/api'

export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: baseQuery,
  tagTypes: ['songs'],
  endpoints: builder => ({
    getSongsByCollectionId: builder.query<ISong[], string>({
      query: collectionId => ({
        url: `/songs`,
        params: { collectionId },
      }),
      providesTags: ['songs'],
    }),
    getSongById: builder.query<ISong, string>({
      query: id => ({
        url: `/songs/${id}`,
      }),
      providesTags: (_, __, id) => [{ type: 'songs', id }],
    }),
    addSong: builder.mutation<ISong, TSongWithoutId>({
      query: data => ({
        url: '/songs',
        method: 'POST',
        body: convertKeys(data, 'snake'),
      }),
      invalidatesTags: ['songs'],
    }),
    updateSong: builder.mutation<ISong, IUpdateSongRequest>({
      query: ({ id, data }) => ({
        url: `/songs/${id}`,
        method: 'PUT',
        body: convertKeys(data, 'snake'),
      }),
      invalidatesTags: ['songs'],
    }),
    deleteSong: builder.mutation<ISong, string>({
      query: id => ({
        url: `/songs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['songs'],
    }),
  }),
})
