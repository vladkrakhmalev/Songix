import { Link, Outlet } from 'react-router-dom'
import './AuthLayout.scss'
import { FC } from 'react'
import { routerConfig } from '@shared/config'

export const AuthLayout: FC = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__container'>
        <Link to={routerConfig.home} className='auth-layout__logo'>
          Songix
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
