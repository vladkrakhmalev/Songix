import { useAppSelector } from '@shared/hooks'

export const useIsEditModeSelector = () =>
  useAppSelector(state => state.editSong.isEditMode)
