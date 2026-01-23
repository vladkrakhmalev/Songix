import { useState } from 'react'
import { Button } from '@shared/ui/button'
import { concertApi, ConcertForm, IConcertEditable } from '@entities/concert'
import { Modal } from '@shared/ui/modal'
import { useTranslation } from 'react-i18next'

export function CreateConcert() {
  const { t } = useTranslation()
  const [createConcert] = concertApi.useCreateConcertMutation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleSubmit(form: IConcertEditable) {
    createConcert(form)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon='plus-small'
        variant='accent'
        size='small'
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Modal title={t('Create new concert')} onClose={() => setIsOpen(false)}>
          <ConcertForm onSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  )
}
