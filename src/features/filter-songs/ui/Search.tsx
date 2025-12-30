import { Input } from '@shared/ui/input'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { setSearch } from '../model/filterSongsSlice'
import { selectSearch } from '../model/filterSongs.selectors'

export function Search() {
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectSearch)

  function handlerChange(value: string) {
    dispatch(setSearch(value))
  }

  return (
    <Input type='search' value={search} onChange={handlerChange}>
      Поиск
    </Input>
  )
}
