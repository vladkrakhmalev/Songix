import { useAppSelector } from '@shared/hooks'

export function useIsEditModeSelector() {
  return useAppSelector(state => state.editSong.isEditMode)
}
