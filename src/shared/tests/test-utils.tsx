/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import { ThemeProvider } from '@infra/theme'
import { I18nextProvider } from 'react-i18next'
import { testI18n } from '@infra/translations/config/testI18n'
import { collectionApi } from '@entities/collection'
import { songApi } from '@entities/song'
import { authApi } from '@entities/auth'
import { concertApi } from '@entities/concert'
import { filterSongsReducer } from '@features/filter-songs'
import { configurateSongsReducer } from '@features/configurate-songs'
import { editSongReducer } from '@features/edit-song'
import type { AppState } from '@shared/config/redux'

export function setupStore(preloadedState?: Partial<AppState>) {
  return configureStore({
    reducer: {
      [collectionApi.reducerPath]: collectionApi.reducer,
      [songApi.reducerPath]: songApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [concertApi.reducerPath]: concertApi.reducer,
      filterSongs: filterSongsReducer,
      configurateSongs: configurateSongsReducer,
      editSong: editSongReducer,
    },
    preloadedState: preloadedState as AppState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        collectionApi.middleware,
        songApi.middleware,
        authApi.middleware,
        concertApi.middleware
      ),
  })
}

export type AppStore = ReturnType<typeof setupStore>

interface RenderOptionsProps extends Omit<RenderOptions, 'queries'> {
  store?: AppStore
  route?: MemoryRouterProps['initialEntries']
}

function Wrapper({
  children,
  store,
  route,
}: PropsWithChildren<{
  store: AppStore
  route?: RenderOptionsProps['route']
}>) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={route}>
        <ThemeProvider>
          <I18nextProvider i18n={testI18n}>{children}</I18nextProvider>
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  )
}

export function renderWithProviders(
  ui: ReactElement,
  options?: RenderOptionsProps
) {
  const store = options?.store ?? setupStore()
  const route = options?.route

  function WrapperComponent({ children }: PropsWithChildren) {
    return (
      <Wrapper store={store} route={route}>
        {children}
      </Wrapper>
    )
  }

  return {
    store,
    ...render(ui, { wrapper: WrapperComponent, ...options }),
  }
}
