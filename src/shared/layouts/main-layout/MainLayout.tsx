import { FC, ReactNode } from 'react'
import './MainLayout.scss'
import clsx from 'clsx'
import { Outlet, useOutlet } from 'react-router-dom'

interface IProps {
  sidebar: ReactNode
  size?: 'big'
}

export const MainLayout: FC<IProps> = ({ sidebar, size }) => {
  const outlet = useOutlet()

  return (
    <div className={clsx('main-layout', size && '_' + size)}>
      <div className='main-layout__sidebar'>{sidebar}</div>

      <div className='main-layout__content'>
        <div className='main-layout__content-wrapper'>
          {outlet && <Outlet />}
        </div>
      </div>
    </div>
  )
}
