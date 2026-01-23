import { MouseEvent, useState } from 'react'
import './DeleteConcert.scss'
import { Button } from '@shared/ui/button'
import { concertApi, IConcert } from '@entities/concert'
import { Modal } from '@shared/ui/modal'
import { useTranslation } from 'react-i18next'

interface IProps {
  concert: IConcert
}

export function DeleteConcert({ concert }: IProps) {
  const { t } = useTranslation()
  const [deleteConcert] = concertApi.useDeleteConcertMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleOpen(event: MouseEvent<HTMLElement>) {
    event.stopPropagation()
    setIsOpen(true)
  }

  function handleDelete() {
    deleteConcert(concert.id)
    setIsOpen(false)
  }

  return (
    <>
      <Button icon='trash' onClick={handleOpen}></Button>

      {isOpen && (
        <Modal title={t('Remove concert')} onClose={() => setIsOpen(false)}>
          <div className='delete-concert__content'>
            <p>
              {t('Are you sure you want to delete the concert "{{title}}"?', {
                title: concert.name,
              })}{' '}
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
