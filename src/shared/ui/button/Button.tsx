import clsx from 'clsx'
import './Button.scss'
import { Icon, TIconStyle } from '@shared/ui/icon'
import { useNavigate } from 'react-router-dom'
import { MouseEvent } from 'react'

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'accent' | 'primary' | 'secondary' | 'transparent' | 'danger'
  size?: 'small' | 'big'
  icon?: string
  iconStyle?: TIconStyle
  to?: string
  shouldIconBehindText?: boolean
}

export function Button({
  disabled,
  variant = 'primary',
  type = 'button',
  size,
  children,
  className,
  icon,
  iconStyle,
  to,
  shouldIconBehindText,
  onClick,
  ...props
}: TProps) {
  const navigate = useNavigate()

  const classes = clsx(
    'button',
    variant && '_' + variant,
    size && '_' + size,
    { '_only-icon': !children && icon },
    className
  )

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (to) {
      navigate(to)
    } else {
      onClick?.(event)
    }
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...props}
      onClick={handleClick}
    >
      {icon && !shouldIconBehindText && <Icon name={icon} style={iconStyle} />}

      {children}

      {icon && shouldIconBehindText && <Icon name={icon} style={iconStyle} />}
    </button>
  )
}
