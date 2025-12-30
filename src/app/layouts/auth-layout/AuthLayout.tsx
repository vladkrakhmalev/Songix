import { Outlet } from 'react-router-dom'
import './AuthLayout.scss'
import { FC } from 'react'

export const AuthLayout: FC = () => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__container'>
        <a href='/' className='auth-layout__logo'>
          Songix
        </a>
        <Outlet />
      </div>
    </div>
  )
}
