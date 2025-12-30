import { FC, ReactNode } from 'react'
import './CollectionCard.scss'
import { ICollection } from '../../model/collectionType'
import { useNavigate } from 'react-router-dom'
import { routes } from '@infra/router'

interface IProps {
  collection: ICollection
  deleteCollection: ReactNode
  editCollection: ReactNode
}

export const CollectionCard: FC<IProps> = ({
  collection,
  deleteCollection,
  editCollection,
}) => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    if (collection) {
      navigate(routes.collection(collection.id))
    }
  }

  return (
    <div onClick={handleRedirect} className='collection-card'>
      <div className='collection-card__header'>
        {editCollection}
        {deleteCollection}
      </div>
      <p className='collection-card__count'>Песен: {collection.songsCount}</p>
    </div>
  )
}
