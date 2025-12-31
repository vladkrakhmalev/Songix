import { Link, NavLink } from 'react-router-dom'
import './UILink.scss'
import clsx from 'clsx'

interface IUILink extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string
  children?: string
  icon?: string
  nav?: boolean
  className?: string
}

export function UILink(props: IUILink) {
  const { to, children, icon, nav, className, ...rest } = props

  if (nav)
    return (
      <NavLink className={clsx('link', className)} to={to} {...rest}>
        {icon && <i className={'link__icon fi fi-' + icon}></i>}
        {children}
      </NavLink>
    )

  return (
    <Link className={clsx('link', className)} to={to} {...rest}>
      {icon && <i className={'link__icon fi fi-' + icon}></i>}
      {children}
    </Link>
  )
}
