import { MouseEvent, ReactNode, useCallback } from 'react'
import './Modal.scss'
import { createPortal } from 'react-dom'
import { Button } from '@shared/ui/button'
import { useKeyboard } from '@shared/hooks'

interface IProps {
  children: ReactNode
  title?: string
  onClose?: () => void
}

export function Modal({ children, title, onClose }: IProps) {
  const RootElem = document.getElementById('main')

  const handleClose = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      event.stopPropagation()
      onClose?.()
    },
    [onClose]
  )

  useKeyboard({
    Escape: handleClose,
  })

  const ModalElement = (
    <div className='modal__overlay' onClick={handleClose}>
      <div className='modal__content' onClick={e => e.stopPropagation()}>
        {title && (
          <div className='modal__header'>
            <h3 className='modal__title'>{title}</h3>

            <Button
              icon='cross-small'
              variant='secondary'
              onClick={handleClose}
            />
          </div>
        )}

        {children}
      </div>
    </div>
  )

  if (RootElem) {
    return createPortal(ModalElement, RootElem)
  }

  return ModalElement
}
