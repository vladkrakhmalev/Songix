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
  onToggle?: (value: boolean) => void
}

export const Notification: FC<INotification> = (props) => {
  const {
    isOpen: isVisible,
    title,
    description,
    icon,
    type,
    onToggle,
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(isVisible)

  const rootElem = document.getElementById('main')

  const notificationClass = clsx(
    'notification',
    type && '_' + type,
    icon && '_with-icon',
    isOpen && '_open',
  )

  useEffect(() => {
    setIsOpen(isVisible)
    const timer = setTimeout(() => handleClose(), 3000)
    return () => clearTimeout(timer)
  }, [isVisible])

  const handleClose = () => {
    setIsOpen(false)
    if (onToggle) onToggle(false)
  }

  if (!rootElem) return

  return createPortal(
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
        onClick={handleClose}
      ></Button>
    </div>,
    rootElem
  )
}