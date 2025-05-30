import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from './SongList'
import { FilterSongs } from '@features/filter-songs'
import './CollectionSidebar.scss'
import { Button } from '@shared/ui/button'
import { songApi } from '@entities/song'
import { useAppDispatch } from '@shared/hooks'
import { ISong } from '@entities/song'
import { CollectionSelect } from '@entities/collection'
import { LayoutMainTrigger, toggleHidden } from '@features/toggle-layout'
import { isMobail } from '@shared/utils/is-mobail'
import {
  useActiveCategoriesSelector,
  useSearchSelector,
} from '@features/filter-songs'

export const CollectionSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const activeCategories = useActiveCategoriesSelector()
  const search = useSearchSelector()

  const handleRedirect = () => {
    navigate('/')
    if (isMobail()) dispatch(toggleHidden())
  }

  const { collectionId = '' } = useParams()

  const { data: songs = [], isFetching } =
    songApi.useGetSongsByCollectionIdQuery(collectionId)

  const filterSongs = songs?.filter((song: ISong) => {
    const categoryMatch =
      !activeCategories.length ||
      activeCategories.some(category => song.categories.includes(category.name))
    const searchMatch =
      !search || song.title.toLowerCase().includes(search.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className='collection-sidebar'>
      <div className='collection-sidebar__header'>
        <Button color='grey' icon='rr-home' onClick={handleRedirect} />
        <CollectionSelect />
        <LayoutMainTrigger />
      </div>

      <div className='collection-sidebar__filters'>
        <FilterSongs />
      </div>

      <SongList songs={filterSongs} isFetching={isFetching} />
      <Button
        color='light'
        to={`/collections/${collectionId}/songs/new`}
        icon=''
      >
        Добавить
      </Button>
    </div>
  )
}
