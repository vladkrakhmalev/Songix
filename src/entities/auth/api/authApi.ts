import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from './authApi.types'
import { baseQueryFn } from '@shared/api'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryFn,
  endpoints: builder => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: credentials => ({
        url: '/auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: userData => ({
        url: '/auth/register/',
        method: 'POST',
        body: userData,
      }),
    }),
    refresh: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/refresh/',
        method: 'POST',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
    }),
  }),
})
