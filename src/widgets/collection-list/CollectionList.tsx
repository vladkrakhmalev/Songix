import { FC } from 'react'
import './CollectionList.scss'
import {
  collectionApi,
  CollectionCard,
  ICollection,
} from '@entities/collection'
import { RenameCollection } from '@features/rename-collection'
import { TransitionList } from '@shared/lib/transition'
import { DeleteCollection } from '@features/delete-collection'

export const CollectionList: FC = () => {
  const { data: collections = [], isLoading } =
    collectionApi.useGetCollectionsQuery()

  const preloaderArray = isLoading ? [0, 1, 2, 3, 4] : []

  const renderCollectionItem = (collection: ICollection) => (
    <CollectionCard
      key={collection.id}
      collection={collection}
      deleteCollection={<DeleteCollection collection={collection} />}
      editCollection={<RenameCollection collection={collection} />}
    />
  )

  if (!isLoading && collections?.length == 0) {
    return <p className='collection-list__message'>Cборников нет</p>
  }

  return (
    <div className='collection-list'>
      <TransitionList
        items={preloaderArray}
        renderItem={() => <CollectionCard />}
        renderKey={item => item}
      />

      <TransitionList
        items={collections}
        renderItem={renderCollectionItem}
        renderKey={collection => collection.id}
      />
    </div>
  )
}
