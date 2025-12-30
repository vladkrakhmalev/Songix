import { FC } from 'react'
import './MainLayout.scss'
import { Outlet, useOutlet } from 'react-router-dom'
import { Navigation } from '@widgets/navigation'

export const MainLayout: FC = () => {
  const outlet = useOutlet()

  return (
    <div className='main-layout'>
      <div className='main-layout__content'>{outlet && <Outlet />}</div>

      <Navigation />
    </div>
  )
}
