import { configureStore } from '@reduxjs/toolkit'
import { collectionApi } from '@entities/collection'
import { filterSongsReducer } from '@features/filter-songs'
import { configurateSongsReducer } from '@features/configurate-songs'
import { songApi } from '@entities/song'
import { editSongReducer } from '@features/edit-song'
import { authApi } from '@entities/auth'

export const store = configureStore({
  reducer: {
    [collectionApi.reducerPath]: collectionApi.reducer,
    [songApi.reducerPath]: songApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filterSongs: filterSongsReducer,
    configurateSongs: configurateSongsReducer,
    editSong: editSongReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      collectionApi.middleware,
      songApi.middleware,
      authApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
