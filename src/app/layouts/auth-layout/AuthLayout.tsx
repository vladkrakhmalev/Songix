import { Link, Outlet } from 'react-router-dom'
import './AuthLayout.scss'
import { routes } from '@infra/router'

export function AuthLayout() {
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
