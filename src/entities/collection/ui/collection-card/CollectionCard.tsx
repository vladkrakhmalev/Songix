import { FC, ReactNode, } from 'react'
import './CollectionCard.scss'
import { ICollection } from '../../model/collectionType'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@shared/hooks'
import { toggleHidden } from '@features/toggle-layout'

interface IProps {
  collection?: ICollection
  deleteCollection?: ReactNode
  editCollection?: ReactNode
}

export const CollectionCard: FC<IProps> = ({ collection, deleteCollection, editCollection, }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRedirect = () => {
    if (collection) {
      navigate(`/collections/${collection.id}/songs`)
      dispatch(toggleHidden())
    }
  }

  if (!collection) return (
    <div className="collection-card _load">
      <h3 className="collection-card__title"></h3>
      <p className="collection-card__count"></p>
    </div>
  )

  return (
    <div onClick={handleRedirect} className="collection-card">
      <div className="collection-card__header">
        {editCollection}
        {deleteCollection}
      </div>
      <p className="collection-card__count">Песен: {collection.age}</p>
    </div>
  )
}