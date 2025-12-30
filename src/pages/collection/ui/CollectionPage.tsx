import './CollectionPage.scss'
import { useParams } from 'react-router-dom'
import { FilterSongs } from '@features/filter-songs'
import { SongList } from '@widgets/song-list'
import { Button } from '@shared/ui/button'
import { collectionApi } from '@entities/collection'
import { routes } from '@infra/router'
import { BackButton } from '@infra/router'

function CollectionPage() {
  const { collectionId = '' } = useParams()

  const formatCollectionId = Number(collectionId)
  const { data: collection } =
    collectionApi.useGetCollectionQuery(formatCollectionId)

  return (
    <div className='collection-page'>
      <div className='collection-page__header'>
        <BackButton to={routes.collections()} />

        <h1 className='collection-page__title'>{collection?.title}</h1>

        <Button
          icon='plus-small'
          variant='accent'
          size='small'
          to={routes.songNew(collectionId)}
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
