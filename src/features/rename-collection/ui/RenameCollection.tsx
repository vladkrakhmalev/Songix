import { MouseEvent, useState } from 'react'
import './RenameCollection.scss'
import {
  collectionApi,
  ICollection,
  validateCollection,
} from '@entities/collection'
import { Input } from '@shared/ui/input'
import { Button } from '@shared/ui/button'
import { useTranslation } from 'react-i18next'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: ICollection
}

export function RenameCollection({ collection }: IProps) {
  const { t } = useTranslation()
  const [renameCollection] = collectionApi.useUpdateCollectionMutation()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(collection.title)
  const [inputError, setInputError] = useState<string | undefined>()

  function handleOpen(event: MouseEvent) {
    event.stopPropagation()
    setIsEdit(true)
  }

  function handleInputChange(value: string) {
    setInputError(undefined)
    setTitle(value)
  }

  function handleSave(value: string) {
    const error = validateCollection(value)

    if (error) {
      return setInputError(error)
    }

    if (value !== collection.title) {
      renameCollection({ id: collection.id, data: { title: value } })
    }

    setIsEdit(false)
  }

  function handleCancel() {
    setTitle(collection.title)
    setIsEdit(false)
  }

  if (isEdit)
    return (
      <Input
        value={title}
        error={inputError}
        type='independent'
        className='edit-collection__input'
        shouldFocus
        variant='secondary'
        onChange={handleInputChange}
        onSave={handleSave}
        onBlur={handleCancel}
      >
        {t('Title')}
      </Input>
    )

  return (
    <>
      <h3 className='edit-collection__title'>{title}</h3>
      <Button icon='pencil' onClick={handleOpen}></Button>
    </>
  )
}
