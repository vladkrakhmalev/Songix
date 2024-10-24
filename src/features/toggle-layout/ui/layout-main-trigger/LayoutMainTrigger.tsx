import { FC } from 'react';
import './LayoutMainTrigger.scss'
import { Button } from "@shared/ui/button"
import { useAppDispatch } from '@shared/hooks';
import { toggleHidden } from '../../model/toggleLayoutSlice';

interface ILayoutMainTrigger {
  className?: string
}

export const LayoutMainTrigger: FC<ILayoutMainTrigger> = ({ className, }) => {

  const dispatch = useAppDispatch()

  return (
    <Button
      color="grey"
      icon='rr-sidebar'
      onClick={() => dispatch(toggleHidden())}
      className={className}
    />
  );
};
