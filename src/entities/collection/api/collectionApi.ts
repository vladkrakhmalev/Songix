import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@shared/config";
import { ICollection } from "../model/collectionType";

interface ICollectionResponse {
  users: ICollection[]
  limit: number
  skip: number
  total: number
}

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCollections: builder.query<ICollectionResponse, number>({
      query: (limit) => ({
        url: '/users',
        params: {limit}
      })
    }),
    getCollectionById: builder.query<ICollectionResponse, number>({
      query: (userId) => ({
        url: '/users',
        params: {userId}
      })
    })
  })
})