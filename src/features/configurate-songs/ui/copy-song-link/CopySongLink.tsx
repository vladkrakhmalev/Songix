import { FC, useState } from 'react';
import './CopySongLink.scss'
import { ConfigurateItem } from '../configurate-item';
import { useLocation } from 'react-router-dom';
import { Notification } from '@shared/ui/notification';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const CopySongLink: FC<IProps> = ({}) => {

  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const location = useLocation();

  const handleCopy = () => {
    const currentUrl = window.location.origin + location.pathname;
    navigator.clipboard.writeText(currentUrl)
    setOpenNotification(true)
  }

  return (
    <>
      <ConfigurateItem
        icon='rr-share'
        title='Поделиться'
        onClick={handleCopy}
      />
      <Notification
        isOpen={openNotification}
        onToggle={setOpenNotification}
        icon='rr-clone'
        title='Ссылка скопирована'
      />
    </>
  );
};
