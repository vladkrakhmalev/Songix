import { FC, MouseEvent, useState, } from 'react'
import './CollectionCard.scss'
import { ICollection } from '../../model/collectionType'
import { Link } from 'react-router-dom'
import { Popup } from '@shared/ui/popup'
import { Button } from '@shared/ui/button'

interface CollectionCardProps {
  collection?: ICollection
}

export const CollectionCard: FC<CollectionCardProps> = ({collection}) => {

  // const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleDelete = (event: MouseEvent) => {
    event.preventDefault()
  }

  const deletePopup = (
    <div className="configurate-list__popup">
      <p className="configurate-list__popup-title">Удалить песню?</p>
      <p className="configurate-list__popup-text">Вы точно хотите удалить сборник "{collection?.firstName}"?</p>
      <p className="configurate-list__popup-text">Это действие нельзя будет отменить</p>
      <Button icon='rr-trash' color='red' onClick={handleDelete}>Удалить</Button>
      <Button icon='rr-cross-small' color='light'>Отменить</Button>
    </div>
  )

  return (
    <>
      {!collection && (
        <div className="collection-card _load">
          <h3 className="collection-card__title"></h3>
          <p className="collection-card__count"></p>
        </div>
      )}

      {collection && (
        <Link to={`/collections/${collection.id}/songs`} className="collection-card">
          <div className="collection-card__header">
            <h3 className="collection-card__title">{collection.firstName}</h3>
            <i className="collection-card__action fi fi-rr-pencil"></i>
            <Popup size="full" trigger={<i className="collection-card__action fi fi-rr-trash"></i>}>
              {deletePopup}
            </Popup>
          </div>
          <p className="collection-card__count">Песен: {collection.age}</p>
        </Link>
      )}
    </>
  )
}