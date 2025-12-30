import { FC, useState } from 'react'
import './CollectionSelect.scss'
import { collectionApi } from '../../api/collectionApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from '@shared/ui/select'

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
    navigate(`/collections/${id}/songs`)
  }

  return (
    <div className='collection-select'>
      {/* <Skeleton
        in={isLoading}
        variant='secondary'
        height='40px'
        className='collection-select__skeleton'
      /> */}

      {!isLoading && (
        <div className='collection-select__transition'>
          <Select
            options={collectionItems}
            value={aciveCollectionId}
            optionsTitle='Ваши сборники:'
            onChange={handlerChange}
          />
        </div>
      )}
    </div>
  )
}
