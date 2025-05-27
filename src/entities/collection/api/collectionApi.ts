import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@shared/config";
import { ICollection, ICollectionBase } from "../model/collectionType";

export interface IUpdateCollectionRequest {
  id: number;
  data: Partial<ICollectionBase>;
}

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCollections: builder.query<ICollection[], number>({
      query: (limit) => ({
        url: "/collections",
        params: { limit },
      }),
    }),
    getCollection: builder.query<ICollection, number>({
      query: (id) => ({
        url: `/collections/${id}`,
      }),
    }),
    addCollection: builder.mutation<ICollection, string>({
      query: (title) => ({
        url: "/collections",
        method: "POST",
        body: { title },
      }),
    }),
    updateCollection: builder.mutation<ICollection, IUpdateCollectionRequest>({
      query: ({ id, data }) => ({
        url: `/collections/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCollection: builder.mutation<ICollection, number>({
      query: (id) => ({
        url: `/collections/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
