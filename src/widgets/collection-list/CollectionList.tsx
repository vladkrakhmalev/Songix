import { FC } from 'react'
import clsx from 'clsx'
import './CollectionList.scss'
import { collectionApi, CollectionCard } from '@entities/collection'
import { AddCollection, DeleteCollection, RenameCollection } from "@features/manage-collection"

export const CollectionList: FC = () => {

  const { data: response, isLoading } = collectionApi.useGetCollectionsQuery(6)
  const collections = response && response.users

  const preloaderArray = [0,1,2,3,4]

  if (!isLoading && collections?.length == 0) {
    return (<>
      Cборников нет
      <AddCollection/>
    </>)
  }

  return (
    <div className='collection-list'>
      <div className={clsx('collection-list__preloader', isLoading && '_visible')}>
        {preloaderArray.map(id => 
          <CollectionCard key={id}/>
        )}
      </div>

      {collections && <div className="collection-list__content">
        {collections.map(collection => 
          <CollectionCard
            key={collection.id}
            collection={collection}
            deleteCollection={<DeleteCollection collection={collection}/>}
            editCollection={<RenameCollection collection={collection}/>} 
          />
        )}
        <AddCollection/>
      </div>}
    </div>
  )
}