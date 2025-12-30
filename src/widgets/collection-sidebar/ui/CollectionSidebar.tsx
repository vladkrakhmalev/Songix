import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from './SongList'
import { FilterSongs } from '@features/filter-songs'
import './CollectionSidebar.scss'
import { Button } from '@shared/ui/button'
import { CollectionSelect } from '@entities/collection'
import { routerConfig } from '@shared/config/routerConfig'

export const CollectionSidebar = () => {
  const { collectionId = '' } = useParams()
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate(routerConfig.root)
  }

  return (
    <div className='collection-sidebar'>
      <div className='collection-sidebar__header'>
        <Button color='grey' icon='rr-home' onClick={handleRedirect} />
        <CollectionSelect />
      </div>

      <FilterSongs />

      <SongList />

      <Button
        color='light'
        to={routerConfig.collectionSongNew.replace(
          ':collectionId',
          collectionId
        )}
        icon=''
      >
        Добавить
      </Button>
    </div>
  )
}
