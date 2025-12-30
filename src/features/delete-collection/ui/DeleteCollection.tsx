import { MouseEvent, useState } from 'react'
import './DeleteCollection.scss'
import { Button } from '@shared/ui/button'
import { collectionApi, ICollection } from '@entities/collection'
import { Modal } from '@shared/ui/modal'

interface IProps {
  collection: ICollection
}

export function DeleteCollection({ collection }: IProps) {
  const [deletteCollection] = collectionApi.useDeleteCollectionMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleOpen(event: MouseEvent<HTMLElement>) {
    event.stopPropagation()
    setIsOpen(true)
  }

  function handleDelete() {
    deletteCollection(collection.id)
    setIsOpen(false)
  }

  return (
    <>
      <Button icon='trash' onClick={handleOpen}></Button>

      {isOpen && (
        <Modal title='Удалить сборник' onClose={() => setIsOpen(false)}>
          <div className='delete-collection__content'>
            <p>
              Вы точно хотите удалить сборник &quot;{collection.title}&quot;?
              Это действие нельзя будет отменить
            </p>

            <Button icon='trash' variant='danger' onClick={handleDelete}>
              Удалить
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
