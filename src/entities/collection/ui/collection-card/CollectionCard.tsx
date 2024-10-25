import { FC, ReactNode, } from 'react'
import './CollectionCard.scss'
import { ICollection } from '../../model/collectionType'
import { Link } from 'react-router-dom'

interface IProps {
  collection?: ICollection
  deleteCollection?: ReactNode
  editCollection?: ReactNode
}

export const CollectionCard: FC<IProps> = ({ collection, deleteCollection, editCollection, }) => {

  if (!collection) return (
    <div className="collection-card _load">
      <h3 className="collection-card__title"></h3>
      <p className="collection-card__count"></p>
    </div>
  )

  return (
    <Link to={`/collections/${collection.id}/songs`} className="collection-card">
      <div className="collection-card__header">
        {editCollection}
        {deleteCollection}
      </div>
      <p className="collection-card__count">Песен: {collection.age}</p>
    </Link>
  )
}