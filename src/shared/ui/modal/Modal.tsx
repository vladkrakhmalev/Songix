import { FC, MouseEvent, ReactNode, useCallback } from 'react'
import './Modal.scss'
import { Transition } from '@shared/lib/transition'
import { createPortal } from 'react-dom'
import { Button } from '@shared/ui/button'
import { useKeyboard } from '@shared/hooks'

interface IProps {
  isOpen: boolean
  children: ReactNode
  title?: string
  onClose?: () => void
}

export const Modal: FC<IProps> = ({ isOpen, children, title, onClose }) => {
  const RootElem = document.getElementById('main')

  const handleClose = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      event.stopPropagation()
      onClose?.()
    },
    [onClose]
  )

  useKeyboard(
    {
      Escape: handleClose,
    },
    {
      enabled: isOpen,
    }
  )

  const ModalElement = (
    <Transition in={isOpen}>
      <div className='modal__overlay' onClick={handleClose}>
        <div className='modal__content' onClick={e => e.stopPropagation()}>
          {title && (
            <div className='modal__header'>
              <h3 className='modal__title'>{title}</h3>

              <Button
                icon='rr-cross-small'
                size='small'
                color='grey'
                onClick={handleClose}
              />
            </div>
          )}

          {children}
        </div>
      </div>
    </Transition>
  )

  if (RootElem) {
    return createPortal(ModalElement, RootElem)
  }

  return ModalElement
}
