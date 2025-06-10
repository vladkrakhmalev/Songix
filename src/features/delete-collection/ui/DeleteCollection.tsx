import { FC, MouseEvent, useState } from 'react'
import './DeleteCollection.scss'
import { Button } from '@shared/ui/button'
import { collectionApi, ICollection } from '@entities/collection'
import { Modal } from '@shared/ui/modal'

interface IProps {
  collection: ICollection
}

export const DeleteCollection: FC<IProps> = ({ collection }) => {
  const [deletteCollection] = collectionApi.useDeleteCollectionMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setIsOpen(true)
  }

  const handleDelete = () => {
    deletteCollection(collection.id)
    setIsOpen(false)
  }

  return (
    <>
      <i
        className='delete-collection__trigger fi fi-rr-trash'
        onClick={handleOpen}
      ></i>

      <Modal
        isOpen={isOpen}
        title='Удалить сборник'
        onClose={() => setIsOpen(false)}
      >
        <div className='delete-collection__content'>
          <p>
            Вы точно хотите удалить сборник &quot;{collection.title}&quot;? Это
            действие нельзя будет отменить
          </p>

          <Button
            size='medium'
            icon='rr-trash'
            color='red'
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </div>
      </Modal>
    </>
  )
}
