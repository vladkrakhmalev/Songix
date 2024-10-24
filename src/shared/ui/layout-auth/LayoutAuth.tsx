import { Outlet } from 'react-router-dom'
import './LayoutAuth.scss'
import { FC } from 'react'

export const LayoutAuth: FC = () => {

  return (
    <div className='layout-auth'>
      <div className="layout-auth__container">
        <a href="/" className='layout-auth__logo'>Songix</a>
        <Outlet/>
      </div>
  </div>
  )
}