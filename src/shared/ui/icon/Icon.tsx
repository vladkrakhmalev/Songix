import clsx from 'clsx'

import './Icon.scss'
import { TIconStyle } from './icon.types'

type TProps = {
  name: string
  style?: TIconStyle
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Icon({ name, style = 'rr', className, onClick }: TProps) {
  const classes = clsx(
    'icon',
    'fi',
    'fi-' + style,
    `fi-${style}-${name}`,
    className
  )
  return <i className={classes} aria-hidden='true' onClick={onClick} />
}
