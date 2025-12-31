import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../app/store/store'

export type AppState = RootState

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
