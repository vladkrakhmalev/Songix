import { FC } from 'react'
import './CollectionList.scss'
import {
  collectionApi,
  CollectionCard,
  CollectionCardSkeleton,
  ICollection,
} from '@entities/collection'
import { RenameCollection } from '@features/rename-collection'
import { TransitionList } from '@shared/lib/transition'
import { DeleteCollection } from '@features/delete-collection'

export const CollectionList: FC = () => {
  const { data: collections = [], isLoading } =
    collectionApi.useGetCollectionsQuery()

  const renderCollectionItem = (collection: ICollection) => (
    <CollectionCard
      collection={collection}
      deleteCollection={<DeleteCollection collection={collection} />}
      editCollection={<RenameCollection collection={collection} />}
    />
  )

  if (!isLoading && collections.length == 0) {
    return <p className='collection-list__message'>Cборников нет</p>
  }

  return (
    <div className='collection-list'>
      <TransitionList
        items={collections}
        isLoading={isLoading}
        className='collection-list__items'
        preloadItem={<CollectionCardSkeleton />}
        renderItem={renderCollectionItem}
        renderKey={collection => collection.id}
      />
    </div>
  )
}
