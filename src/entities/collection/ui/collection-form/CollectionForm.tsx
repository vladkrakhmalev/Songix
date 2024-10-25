import { FC, useState } from 'react';
import './CollectionForm.scss'
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  onCreate: (value: string) => void
  onCancel: () => void
}

export const CollectionForm: FC<IProps> = ({ onCreate, onCancel }) => {

  const [name, setName] = useState<string>('')

  return (
    <div className='collection-form'>
      <h3 className='collection-form__title'>Создать новый сборник</h3>
      <Input value={name} onChange={setName} bg='light' className='collection-form__input'>Название</Input>
      <Button onClick={() => onCreate(name)}>Создать</Button>
      <Button onClick={onCancel} color='white'>Отменить</Button>
    </div>
  );
};
