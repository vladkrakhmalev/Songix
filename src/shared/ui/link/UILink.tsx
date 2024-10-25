import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import './UILink.scss'
import clsx from "clsx";

interface IUILink extends React.HTMLAttributes<HTMLDivElement> {
  to: string
  children?: string
  icon?: string
  nav?: boolean
  soon?: boolean
  className?: string 
}

export const UILink: FC<IUILink> = (props) => {
  const {
    to,
    children,
    icon,
    nav,
    soon,
    className,
    ...rest
  } = props

  if (nav) return (
    <NavLink className={clsx("link", className, soon && '_soon')} to={to} {...rest}>
      {icon && <i className={'link__icon fi fi-' + icon}></i>}
      {children}
    </NavLink>
  )

  return (
    <Link className={clsx("link", className)} to={to} {...rest}>
      {icon && <i className={'link__icon fi fi-' + icon}></i>}
      {children}
    </Link>
  )
}