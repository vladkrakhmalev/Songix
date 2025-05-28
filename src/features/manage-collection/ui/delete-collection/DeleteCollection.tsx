import { FC, useState } from 'react'
import './DeleteCollection.scss'
import { Popup } from '@shared/ui/popup'
import { Button } from '@shared/ui/button'
import { collectionApi, ICollection } from '@entities/collection'

interface IProps {
  collection: ICollection
}

export const DeleteCollection: FC<IProps> = ({ collection }) => {
  const [deletteCollection] = collectionApi.useDeleteCollectionMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDelete = () => {
    deletteCollection(collection.id)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const trigger = (
    <i
      className='delete-collection__trigger fi fi-rr-trash'
      onClick={event => event.preventDefault()}
    ></i>
  )

  return (
    <Popup
      isOpen={isOpen}
      onToggle={open => setIsOpen(open)}
      size='full'
      trigger={trigger}
    >
      <div className='configurate-list__popup'>
        <p className='configurate-list__popup-title'>Удалить сборник?</p>
        <p className='configurate-list__popup-text'>
          Вы точно хотите удалить сборник &quot;{collection.title}&quot;?
        </p>
        <p className='configurate-list__popup-text'>
          Это действие нельзя будет отменить
        </p>
        <Button
          size='medium'
          icon='rr-trash'
          color='red'
          onClick={handleDelete}
        >
          Удалить
        </Button>
        <Button
          size='medium'
          icon='rr-cross-small'
          color='light'
          onClick={handleCancel}
        >
          Отменить
        </Button>
      </div>
    </Popup>
  )
}
