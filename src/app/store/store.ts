import { configureStore } from "@reduxjs/toolkit";
import { collectionApi } from "@entities/collection";
import { filterSongsReducer } from "@features/filter-songs";
import { configurateSongsReducer } from "@features/configurate-songs";
import { songApi } from "@entities/song";
import { toggleLayoutReducer } from "@features/toggle-layout";
import { songReducer } from "@entities/song/model/songSlice";

export const store = configureStore({
  reducer: {
    [collectionApi.reducerPath]: collectionApi.reducer,
    [songApi.reducerPath]: songApi.reducer,
    filterSongs: filterSongsReducer,
    configurateSongs: configurateSongsReducer,
    toggleLayout: toggleLayoutReducer,
    song: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collectionApi.middleware, songApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch