import { FC, useState } from 'react'
import './CollectionSelect.scss'
import { collectionApi } from '../../api/collectionApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from '@shared/ui/select'
import { Transition } from '@shared/lib/transition'
import { routerConfig } from '@shared/config/routerConfig'

export const CollectionSelect: FC = () => {
  const navigate = useNavigate()
  const { collectionId = '' } = useParams()

  const { data: collections = [], isLoading } =
    collectionApi.useGetCollectionsQuery(0)

  const collectionItems = collections.map(collection => ({
    label: collection.title,
    value: collection.id.toString(),
  }))

  const [aciveCollectionId, setAciveCollectionId] =
    useState<string>(collectionId)

  const handlerChange = (id: string) => {
    setAciveCollectionId(id)
    navigate(routerConfig.collectionSongs.replace(':collectionId', id))
  }

  return (
    <div className='collection-select'>
      {/* <Skeleton
        in={isLoading}
        variant='secondary'
        height='40px'
        className='collection-select__skeleton'
      /> */}

      <Transition in={!isLoading} className='collection-select__transition'>
        <Select
          options={collectionItems}
          value={aciveCollectionId}
          optionsTitle='Ваши сборники:'
          onChange={handlerChange}
        />
      </Transition>
    </div>
  )
}
