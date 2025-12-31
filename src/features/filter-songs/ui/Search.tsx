import { Input } from '@shared/ui/input'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { setSearch } from '../model/filterSongsSlice'
import { selectSearch } from '../model/filterSongs.selectors'
import { useTranslation } from 'react-i18next'

export function Search() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectSearch)

  function handlerChange(value: string) {
    dispatch(setSearch(value))
  }

  return (
    <Input type='search' value={search} onChange={handlerChange}>
      {t('Search')}
    </Input>
  )
}
