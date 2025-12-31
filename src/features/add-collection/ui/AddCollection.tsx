import { useState } from 'react'
import './AddCollection.scss'
import { Button } from '@shared/ui/button'
import { collectionApi, validateCollection } from '@entities/collection'
import { Modal } from '@shared/ui/modal'
import { Input } from '@shared/ui/input'
import { useTranslation } from 'react-i18next'

export function AddCollection() {
  const { t } = useTranslation()
  const [addCollection] = collectionApi.useAddCollectionMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [inputError, setInputError] = useState<string | undefined>()

  function handleInputChange(value: string) {
    setInputError(undefined)
    setTitle(value)
  }

  function handleSubmit() {
    const error = validateCollection(title)

    if (error) {
      return setInputError(error)
    }

    addCollection(title)
    setIsOpen(false)
    setTitle('')
  }

  return (
    <>
      <Button
        icon='plus-small'
        variant='accent'
        size='small'
        onClick={() => setIsOpen(true)}
      >
        {t('Add collection')}
      </Button>

      {isOpen && (
        <Modal
          title={t('Create new collection')}
          onClose={() => setIsOpen(false)}
        >
          <div className='add-collection__form'>
            <Input
              value={title}
              error={inputError}
              shouldFocus
              onChange={handleInputChange}
              onSave={handleSubmit}
            >
              {t('Title')}
            </Input>
            <Button icon='plus-small' variant='accent' onClick={handleSubmit}>
              {t('Create')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
