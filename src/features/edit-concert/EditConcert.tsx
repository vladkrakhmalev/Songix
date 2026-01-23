import { MouseEvent, useState } from 'react'
import { Button } from '@shared/ui/button'
import {
  concertApi,
  ConcertForm,
  IConcert,
  IConcertEditable,
} from '@entities/concert'
import { Modal } from '@shared/ui/modal'
import { useTranslation } from 'react-i18next'

interface IProps {
  concert: IConcert
}

export function EditConcert({ concert }: IProps) {
  const { t } = useTranslation()
  const [updateConcert] = concertApi.useUpdateConcertMutation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleOpen(event: MouseEvent<HTMLElement>) {
    event.stopPropagation()
    setIsOpen(true)
  }

  function handleSubmit(form: IConcertEditable) {
    updateConcert({ id: concert.id, data: form })
    setIsOpen(false)
  }

  return (
    <>
      <Button icon='pencil' onClick={handleOpen} />

      {isOpen && (
        <Modal title={t('Edit concert')} onClose={() => setIsOpen(false)}>
          <ConcertForm
            initialForm={{ name: concert.name, date: concert.date }}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </>
  )
}
