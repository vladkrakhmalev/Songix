import './CollectionPage.scss'
import { useParams } from 'react-router-dom'
import { FilterSongs } from '@features/filter-songs'
import { SongList } from '@widgets/song-list'
import { Button } from '@shared/ui/button'
import { collectionApi } from '@entities/collection'
import { BackButton } from '@infra/history'

const CollectionPage = () => {
  const { collectionId = '' } = useParams()

  const formatCollectionId = Number(collectionId)
  const { data: collection } =
    collectionApi.useGetCollectionQuery(formatCollectionId)

  return (
    <div className='collection-page'>
      <div className='collection-page__header'>
        <BackButton />

        <h1>{collection?.title}</h1>
      </div>

      <FilterSongs />

      <SongList />

      <Button
        icon='plus-small'
        variant='accent'
        to={`/collections/${collectionId}/songs/new`}
      >
        Добавить
      </Button>
    </div>
  )
}

export default CollectionPage
