import { Input } from '@shared/ui/input'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { setSearch } from '../model/filterSongsSlice'

export function Search() {
  const dispatch = useAppDispatch()
  const { search } = useAppSelector(state => state.filterSongs)

  function handlerChange(value: string) {
    dispatch(setSearch(value))
  }

  return (
    <Input type='search' value={search} onChange={handlerChange}>
      Поиск
    </Input>
  )
}
