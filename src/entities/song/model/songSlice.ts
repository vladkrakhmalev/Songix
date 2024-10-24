import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface songState {
  isEdit: boolean
}

const initialState: songState = {
  isEdit: false
}

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    toggleEdit: (state, action: PayloadAction<boolean | undefined>) => {
      state.isEdit = action.payload !== undefined ? action.payload : !state.isEdit
    },
  }
})

export const { toggleEdit } = songSlice.actions
export const songReducer = songSlice.reducer