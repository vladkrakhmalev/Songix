import './CollectionPage.scss'
import { useParams } from 'react-router-dom'
import { FilterSongs } from '@features/filter-songs'
import { SongList } from '@widgets/song-list'
import { Button } from '@shared/ui/button'
import { collectionApi } from '@entities/collection'
import { routerConfig } from '@shared/config'

const CollectionPage = () => {
  const { collectionId = '' } = useParams()

  const formatCollectionId = Number(collectionId)
  const { data: collection } =
    collectionApi.useGetCollectionQuery(formatCollectionId)

  return (
    <div className='collection-page'>
      <div className='collection-page__header'>
        <div className='collection-page__column'>
          <h1 className='collection-page__title'>
            Песни из {collection?.title}
          </h1>
        </div>

        <Button
          icon='plus-small'
          variant='accent'
          size='small'
          to={routerConfig.songNew.replace(':collectionId', collectionId)}
        >
          Добавить песню
        </Button>
      </div>

      <FilterSongs />

      <SongList />
    </div>
  )
}

export default CollectionPage
