import { Outlet } from 'react-router-dom'
import './AuthLayout.scss'
import { FC } from 'react'
import { routerConfig } from '@shared/config/routerConfig'

export const AuthLayout: FC = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__container'>
        <a href={routerConfig.root} className='auth-layout__logo'>
          Songix
        </a>
        <Outlet />
      </div>
    </div>
  )
}
