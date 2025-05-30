import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@shared/config'
import { ISong, TSongWithoutId } from '../model/songType'
import { IUpdateSongRequest } from './songApi.types'

export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
        body: data,
      }),
      invalidatesTags: ['songs'],
    }),
    updateSong: builder.mutation<ISong, IUpdateSongRequest>({
      query: ({ id, data }) => ({
        url: `/songs/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'songs', id }],
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
