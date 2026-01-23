import { createApi } from '@reduxjs/toolkit/query/react'
import { IConcert, IConcertBase } from '../model/concertType'
import { baseQuery } from '@shared/api'

export interface IUpdateConcertRequest {
  id: number
  data: Partial<IConcertBase>
}

export const concertApi = createApi({
  reducerPath: 'concertApi',
  baseQuery,
  tagTypes: ['concerts'],
  endpoints: builder => ({
    getConcerts: builder.query<IConcert[], void>({
      query: () => '/concerts',
      providesTags: ['concerts'],
    }),
    createConcert: builder.mutation<IConcert, IConcertBase>({
      query: data => ({
        url: '/concerts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['concerts'],
    }),
    updateConcert: builder.mutation<IConcert, IUpdateConcertRequest>({
      query: ({ id, data }) => ({
        url: `/concerts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['concerts'],
    }),
    deleteConcert: builder.mutation<IConcert, number>({
      query: id => ({
        url: `/concerts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['concerts'],
    }),
  }),
})
