import { MouseEvent, useState } from 'react'
import './DeleteCollection.scss'
import { Button } from '@shared/ui/button'
import { collectionApi, ICollection } from '@entities/collection'
import { Modal } from '@shared/ui/modal'
import { useTranslation } from 'react-i18next'

interface IProps {
  collection: ICollection
}

export function DeleteCollection({ collection }: IProps) {
  const { t } = useTranslation()

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
        <Modal title={t('Remove collection')} onClose={() => setIsOpen(false)}>
          <div className='delete-collection__content'>
            <p>
              {t(
                'Are you sure you want to delete the collection "{{title}}"?',
                {
                  title: collection.title,
                }
              )}{' '}
              {t('This action cannot be undone')}
            </p>

            <Button icon='trash' variant='danger' onClick={handleDelete}>
              {t('Remove')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
