import { FC, MouseEvent, useState } from 'react';
import './RenameCollection.scss'
import { ICollection } from '@entities/collection';
import { Input } from '@shared/ui/input';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: ICollection
}

export const RenameCollection: FC<IProps> = ({ collection }) => {

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(collection.firstName)

  const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    setIsEdit(true)
  }

  const handleSave = (value: string) => {
    console.log(value)
    // TODO Сделать отправку на сервер
    setIsEdit(false)
  }

  if (isEdit) return (
    <Input
      value={title}
      type='independent'
      bg="light"
      onChange={setTitle}
      onSave={handleSave}
      className='edit-collection__input'
    >Название</Input>
  )

  return (
    <>
      <h3 className="edit-collection__title">{title}</h3>
      <i
        onClick={handleClick}
        className="edit-collection__trigger fi fi-rr-pencil"
      ></i>
    </>
  );
};
