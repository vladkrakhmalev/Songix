import { FC, useEffect, useState, } from 'react';
import './Notification.scss'
import clsx from 'clsx';
import { Button } from '../button';
import { createPortal } from 'react-dom';

interface INotification {
  isOpen: boolean
  title: string
  description?: string
  icon?: string
  type?: 'default' | 'positive' | 'negative'
}

export const Notification: FC<INotification> = ({ isOpen: isVisible, title, description, icon, type, }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootElem = document.getElementById('main')
  const notificationClass = clsx(
    'notification',
    type && '_' + type,
    icon && '_with-icon',
    isOpen && '_open',
  )

  useEffect(() => {
    setIsOpen(isVisible)
    const timer = setTimeout(() => setIsOpen(false), 5000)
    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <>
      {createPortal(
        <div className={notificationClass}>
          {icon && <i className={'notification__icon fi fi-' + icon}></i>}
          <div className="notification__content">
            <p className="notification__title">{title}</p>
            {description && <p className="notification__description">{description}</p> }
          </div>
          <Button
            className='notification__close'
            size='small'
            color='light'
            icon='rr-cross-small'
            onClick={() => setIsOpen(false)}
          ></Button>
        </div>,
        rootElem
      )}
    </>
  );
}