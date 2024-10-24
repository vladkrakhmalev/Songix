import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@shared/config";
import { ISong } from "../model/songType";

interface IGetSongsResponse {
  posts: ISong[]
  limit: number
  skip: number
  total: number
}

export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Song'],
  endpoints: (builder) => ({
    getSongsByCollectionId: builder.query<IGetSongsResponse, number>({
      query: (userId) => ({
        url: `/users/${userId}/posts?limit=0`,
      })
    }),
    getSongById: builder.query<ISong, number>({
      query: (songId) => ({
        url: `/posts/${songId}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Song', id }],
    }),
    editSong: builder.mutation<ISong, Partial<ISong>>({
      query: ({ id, ...patch}) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Song', id }],
    }),
    deleteSong: builder.mutation<ISong, number>({
      query: (songId) => ({
        url: `/posts/${songId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Song', id }],
    }),
  })
})

export const {
  useGetSongsByCollectionIdQuery,
  useGetSongByIdQuery,
  useEditSongMutation,
  useDeleteSongMutation,
} = songApi