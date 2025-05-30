import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface editSongState {
  isEditMode: boolean
}

const initialState: editSongState = {
  isEditMode: false,
}

const editSongSlice = createSlice({
  name: 'editSong',
  initialState,
  reducers: {
    toggleEditMode: (state, action: PayloadAction<boolean | undefined>) => {
      state.isEditMode =
        action.payload !== undefined ? action.payload : !state.isEditMode
    },
  },
})

export const { toggleEditMode } = editSongSlice.actions
export const editSongReducer = editSongSlice.reducer
