import { Link, Outlet } from 'react-router-dom'
import './AuthLayout.scss'
import { FC } from 'react'
import { routes } from '@infra/router'

export const AuthLayout: FC = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__container'>
        <Link to={routes.home()} className='auth-layout__logo'>
          Songix
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
