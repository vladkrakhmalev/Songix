import { FC, useState } from 'react';
import './AddCollection.scss'
import { Button } from '@shared/ui/button'
import { CollectionForm } from '@entities/collection';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const AddCollection: FC<IProps> = ({}) => {

  const [isCreate, setIsCreate] = useState<boolean>(false)

  const handleCreate = (name: string) => {
    console.log(name)
    // TODO Сделать добавление песни на сервере
    setIsCreate(false)
  }

  if (isCreate) return (
    <CollectionForm
      onCreate={handleCreate}
      onCancel={() => setIsCreate(false)}
    />
  )

  return (
    <Button onClick={() => setIsCreate(true)}>
      + Добавить
    </Button>
  );
};
