import { FC, MouseEvent, ReactNode, useEffect, useState } from 'react'
import { useOutsideClick } from '@shared/hooks'
import './Popup.scss'
import clsx from 'clsx'
import { createPortal } from 'react-dom'

interface IPopup {
  trigger: ReactNode
  children: ReactNode
  size?: 'full' | 'small' | 'medium'
  align?: 'right' | 'left' | 'center'
  className?: string
  isOpen?: boolean
  onToggle?: (value: boolean) => void
}

export const Popup: FC<IPopup> = (props) => {
  const { 
    trigger, 
    children, 
    size, 
    align = 'left', 
    className, 
    isOpen,
    onToggle,
  } = props

  const [open, setOpen] = useState<boolean>(isOpen ? true : false)

  useEffect(() => {
    setOpen(isOpen ? true : false)
  }, [isOpen])



  const ref = useOutsideClick(() => {
    setOpen(false)
    if (onToggle) onToggle(false)
  })

  const handleOpen = (event: MouseEvent) => {
    event.stopPropagation()
    setOpen(true)
    if (onToggle) onToggle(true)
  }

  const rootElem = document.getElementById('main')

  

  const popup = (
    <div
      className={clsx("popup__wrapper", open && '_open', size && '_' + size)}
      onClick={event => event.stopPropagation()}
    >
      <div
        ref={ref}
        className={clsx('popup', '_' + align)}
      >
        {children}
      </div>
    </div>
  )

  return (
    <div className={clsx("popup__container", className)}>
      <div onClick={handleOpen} className="popup__trigger">
        {trigger}
      </div>

      {size === 'full' && rootElem
        ? createPortal(popup, rootElem)
        : popup
      }
    </div>
  )
}