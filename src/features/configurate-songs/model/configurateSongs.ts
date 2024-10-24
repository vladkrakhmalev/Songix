import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ICounterItem } from "@shared/ui/counter"
import { SPEED_ARRAY, TONALITY_ARRAY, TEXT_SIZE_ARRAY } from '../config/consts';

interface configurateSongsState {
  speed: ICounterItem
  tonality: ICounterItem
  textSize: ICounterItem
}

const initialState: configurateSongsState = {
  speed: SPEED_ARRAY[0],
  tonality: TONALITY_ARRAY[0],
  textSize: TEXT_SIZE_ARRAY[6],
}

const configurateSongsSlice = createSlice({
  name: 'configurateSongs',
  initialState,
  reducers: {
    setSpeed: (state, action: PayloadAction<ICounterItem>) => {
      state.speed = action.payload;
    },
    setTonality: (state, action: PayloadAction<ICounterItem>) => {
      state.tonality = action.payload;
    },
    setTextSize: (state, action: PayloadAction<ICounterItem>) => {
      state.textSize = action.payload;
    },
  }
})

export const { setSpeed, setTonality, setTextSize } = configurateSongsSlice.actions
export const configurateSongsReducer = configurateSongsSlice.reducer