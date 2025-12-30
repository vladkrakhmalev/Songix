import { FC, useState } from 'react'
import './AddCollection.scss'
import { Button } from '@shared/ui/button'
import { collectionApi, validateCollection } from '@entities/collection'
import { Modal } from '@shared/ui/modal'
import { Input } from '@shared/ui/input'

export const AddCollection: FC = () => {
  const [addCollection] = collectionApi.useAddCollectionMutation()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [inputError, setInputError] = useState<string | undefined>()

  const handleInputChange = (value: string) => {
    setInputError(undefined)
    setTitle(value)
  }

  const handleSubmit = () => {
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
        Добавить сборник
      </Button>

      {isOpen && (
        <Modal title='Создать новый сборник' onClose={() => setIsOpen(false)}>
          <div className='add-collection__form'>
            <Input
              value={title}
              error={inputError}
              shouldFocus
              onChange={handleInputChange}
              onSave={handleSubmit}
            >
              Название
            </Input>
            <Button icon='plus-small' variant='accent' onClick={handleSubmit}>
              Создать
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
