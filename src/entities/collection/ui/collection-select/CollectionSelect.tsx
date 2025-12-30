import { FC, useState } from 'react'
import { collectionApi } from '../../api/collectionApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from '@shared/ui/select'
import { Skeleton } from '@shared/ui/skeleton'
import { routes } from '@infra/router'

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
    navigate(routes.collection(id))
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <Select
      options={collectionItems}
      value={aciveCollectionId}
      optionsTitle='Ваши сборники:'
      onChange={handlerChange}
    />
  )
}
