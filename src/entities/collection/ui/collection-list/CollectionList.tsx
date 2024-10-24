import { FC } from 'react'
import { collectionApi } from '../../api/collectionApi'
import { CollectionCard } from '../collection-card/CollectionCard'
import './CollectionList.scss'
import { Button } from '@shared/ui/button'
import clsx from 'clsx'

export const CollectionList: FC = () => {

  const { data: response, isLoading } = collectionApi.useGetCollectionsQuery(6)
  const collections = response && response.users

  const preloaderArray = [0,1,2,3,4]

  return (
    <div className='collection-list'>
      <div className={clsx('collection-list__preloader', isLoading && '_visible')}>
        {preloaderArray.map(id => 
          <CollectionCard key={id}/>
        )}
      </div>

      {collections && <div className="collection-list__content">
        {collections.map(collection => 
          <CollectionCard key={collection.id} collection={collection}/>
        )}
        <Button to='/collections/new'>+ Добавить</Button>
      </div>}
    </div>
  )
}