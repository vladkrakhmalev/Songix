import './Button.scss'
import { FC, MouseEvent } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

interface IButton {
  color?: 'light' | 'grey' | 'red' | 'white' | null
  size?: 'small' | 'medium'
  children?: string
  disabled?: boolean
  className?: string
  icon?: string,
  to?: string,
  onClick?: (event: MouseEvent) => void
}

export const Button: FC<IButton> = (props) => {
  const {
    children,
    className,
    disabled = false,
    onClick,
    icon,
    color,
    size,
    to,
  } = props

  const navigate = useNavigate()

  const handlerClick = () => {
    to && navigate(to)
  }

  const buttonClass = clsx(
    'button',
    className,
    color && '_' + color,
    size && '_' + size,
    (icon && !children) && '_icon',
  )

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={to ? handlerClick : onClick}
    >
      {icon && <i className={'button__icon fi fi-' + icon}></i>}
      {children}
    </button>
  )
}