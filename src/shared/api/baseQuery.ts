import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { API_URL, routerConfig } from '@shared/config'
import { convertKeys } from '@shared/utils/convert-case'

export const baseQueryFn = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
})

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryFn(args, api, extraOptions)
  result.data = convertKeys(result.data, 'camel')

  const isRefreshRequest =
    typeof args === 'string'
      ? args.includes('/auth/logout')
      : args.url?.includes('/auth/logout')

  if (result.error && result.error.status === 401 && !isRefreshRequest) {
    console.warn('Access token expired, trying to refresh...')

    const { authApi } = await import('@entities/auth')
    const refreshResult = await api.dispatch(
      authApi.endpoints.refresh.initiate()
    )

    if (refreshResult.data) {
      result = await baseQueryFn(args, api, extraOptions)
    } else {
      console.warn('Failed to refresh token, logging out')
      api.dispatch(authApi.endpoints.logout.initiate())
      window.location.href = routerConfig.login
    }
  }

  return result
}
