import { FC, MouseEvent, ReactNode, useState } from 'react'
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
}

export const Popup: FC<IPopup> = ({ trigger, children, size, align = 'left', className, }) => {

  const [open, setOpen] = useState<boolean>(false)

  const ref = useOutsideClick(() => {
    setOpen(false)
  })

  const handleOpen = (event: MouseEvent) => {
    event.preventDefault()
    setOpen(true)
  }

  const rootElem = document.getElementById('main')

  

  const popup = (
    <div className={clsx("popup__wrapper", open && '_open', size && '_' + size)}>
      <div className={clsx('popup', '_' + align)} ref={ref}>
        {children}
      </div>
    </div>
  )

  return (
    <div className={clsx("popup__container", className)}>
      <div onClick={handleOpen} className="popup__trigger">
        {trigger}
      </div>

      {size === 'full' ? createPortal(popup, rootElem) : popup}
    </div>
  )
}