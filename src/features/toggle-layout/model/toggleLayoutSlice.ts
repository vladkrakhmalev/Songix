import { createSlice } from "@reduxjs/toolkit"
import { isMobail } from "@shared/utils/is-mobail";

interface toggleLayoutState {
  isHidden: boolean
}

const initialState: toggleLayoutState = {
  isHidden: isMobail()
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