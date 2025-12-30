import { ReactNode } from 'react'
import './ConfigurateItem.scss'
import clsx from 'clsx'

interface IConfigurateItem {
  icon?: string
  title: string
  children?: ReactNode
  clickable?: boolean
  onClick?: () => void
}

export function ConfigurateItem({
  icon,
  title,
  children,
  clickable,
  onClick,
}: IConfigurateItem) {
  return (
    <div
      className={clsx(
        'configurate-item',
        (onClick || clickable) && '_with-hover'
      )}
      onClick={onClick}
    >
      {icon && <i className={'configurate-item__icon fi fi-' + icon}></i>}
      <p className='configurate-item__text'>{title}</p>
      {children}
    </div>
  )
}
