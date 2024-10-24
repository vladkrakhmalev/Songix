import { createSlice } from "@reduxjs/toolkit"

interface toggleLayoutState {
  isHidden: boolean
}

const initialState: toggleLayoutState = {
  isHidden: false
}

const toggleLayoutSlice = createSlice({
  name: 'toggleLayout',
  initialState,
  reducers: {
    toggleHidden: (state) => {
      state.isHidden = !state.isHidden;
    },
  }
})

export const { toggleHidden } = toggleLayoutSlice.actions
export const toggleLayoutReducer = toggleLayoutSlice.reducer