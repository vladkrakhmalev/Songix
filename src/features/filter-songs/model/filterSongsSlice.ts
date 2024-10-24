import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CATEGORIES } from "@entities/category"
import type { ICategory } from "@entities/category"

interface FilterSongsState {
  search: string
  categories: ICategory[]
}

const initialState: FilterSongsState = {
  search: '',
  categories: CATEGORIES,
}

const filterSongsSlice = createSlice({
  name: 'filterSongs',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.categories[action.payload].active = true
    },
    setDisactiveCategory: (state, action: PayloadAction<number>) => {
      state.categories[action.payload].active = false
    },
  }
})

export const { setSearch, setActiveCategory, setDisactiveCategory } = filterSongsSlice.actions
export const filterSongsReducer = filterSongsSlice.reducer