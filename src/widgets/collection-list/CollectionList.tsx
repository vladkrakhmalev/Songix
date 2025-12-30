import { FC } from 'react'
import './CollectionList.scss'
import {
  collectionApi,
  CollectionCard,
  CollectionCardSkeleton,
} from '@entities/collection'
import { RenameCollection } from '@features/rename-collection'
import { DeleteCollection } from '@features/delete-collection'
import { SKELETON_ARRAY } from '@shared/ui/skeleton'

export const CollectionList: FC = () => {
  const { data: collections = [], isLoading } =
    collectionApi.useGetCollectionsQuery()

  if (isLoading) {
    return (
      <div className='collection-list'>
        {SKELETON_ARRAY.map(skeleton => (
          <CollectionCardSkeleton key={skeleton} />
        ))}
      </div>
    )
  }

  if (!collections.length) {
    return <p className='collection-list__message'>Cборников нет</p>
  }

  return (
    <div className='collection-list'>
      {collections.map(collection => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          deleteCollection={<DeleteCollection collection={collection} />}
          editCollection={<RenameCollection collection={collection} />}
        />
      ))}
    </div>
  )
}
