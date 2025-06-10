import { FC, MouseEvent, useState } from 'react'
import './RenameCollection.scss'
import {
  collectionApi,
  ICollection,
  validateCollection,
} from '@entities/collection'
import { Input } from '@shared/ui/input'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: ICollection
}

export const RenameCollection: FC<IProps> = ({ collection }) => {
  const [renameCollection] = collectionApi.useUpdateCollectionMutation()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(collection.title)
  const [inputError, setInputError] = useState<string | undefined>()

  const handleOpen = (event: MouseEvent) => {
    event.stopPropagation()
    setIsEdit(true)
  }

  const handleInputChange = (value: string) => {
    setInputError(undefined)
    setTitle(value)
  }

  const handleSave = (value: string) => {
    const error = validateCollection(value)

    if (error) {
      return setInputError(error)
    }

    if (value !== collection.title) {
      renameCollection({ id: collection.id, data: { title: value } })
    }

    setIsEdit(false)
  }

  const handleCancel = () => {
    setTitle(collection.title)
    setIsEdit(false)
  }

  if (isEdit)
    return (
      <Input
        value={title}
        error={inputError}
        type='independent'
        bg='light'
        className='edit-collection__input'
        shouldFocus
        onChange={handleInputChange}
        onSave={handleSave}
        onBlur={handleCancel}
      >
        Название
      </Input>
    )

  return (
    <>
      <h3 className='edit-collection__title'>{title}</h3>
      <i
        onClick={handleOpen}
        className='edit-collection__trigger fi fi-rr-pencil'
      ></i>
    </>
  )
}
