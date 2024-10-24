import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import './UILink.scss'
import clsx from "clsx";

interface IUILink {
  to: string
  children?: string
  icon?: string
  nav?: boolean
  className?: string 
}

export const UILink: FC<IUILink> = ({to, children, icon, nav, className}) => {

  if (nav) {
    return (
      <NavLink className={clsx("link", className)} to={to}>
        {icon && <i className={'link__icon fi fi-' + icon}></i>}
        {children}
      </NavLink>
    )
  }

  return (
    <Link className={clsx("link", className)} to={to}>
      {icon && <i className={'link__icon fi fi-' + icon}></i>}
      {children}
    </Link>
  )
}