import { Outlet } from 'react-router-dom'
import './AuthLayout.scss'

export function AuthLayout() {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__container'>
        <div className='auth-layout__logo'>Songix</div>
        <Outlet />
      </div>
    </div>
  )
}
