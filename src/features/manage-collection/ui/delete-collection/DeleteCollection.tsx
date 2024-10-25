import { FC, useState } from 'react';
import './DeleteCollection.scss'
import { Popup } from '@shared/ui/popup'
import { Button } from '@shared/ui/button'
import { ICollection } from '@entities/collection';

interface IProps {
  collection: ICollection
}

export const DeleteCollection: FC<IProps> = ({ collection }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDelete = () => {
    console.log('Cборник удален')
    // TODO Сделать удаление на сервере
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const trigger = (
    <i
      className="delete-collection__trigger fi fi-rr-trash"
      onClick={event => event.preventDefault()}
    ></i>
  )

  return (
    <Popup isOpen={isOpen} onToggle={open => setIsOpen(open)} size="full" trigger={trigger}>
      <div className="configurate-list__popup">
        <p className="configurate-list__popup-title">Удалить песню?</p>
        <p className="configurate-list__popup-text">Вы точно хотите удалить сборник "{collection.firstName}"?</p>
        <p className="configurate-list__popup-text">Это действие нельзя будет отменить</p>
        <Button icon='rr-trash' color='red' onClick={handleDelete}>Удалить</Button>
        <Button icon='rr-cross-small' color='light' onClick={handleCancel}>Отменить</Button>
      </div>
    </Popup>
  );
};
