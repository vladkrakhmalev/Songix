import { LayoutMainTrigger, toggleHidden } from '@features/toggle-layout'
import './Navigation.scss'
import { UILink } from "@shared/ui/link"
import { MouseEvent } from 'react'
import { useAppDispatch } from '@shared/hooks'
import { isMobail } from '@shared/utils/is-mobail'

export const Navigation = () => {

  const links = [
    // { id: 0, link: '/', icon: 'rr-apps', title: 'Главная' },
    { id: 1, link: '/collections', icon: 'rr-music-alt', title: 'Сборники' },
    { id: 2, link: '/profile', icon: 'rr-user', title: 'Профиль', soon: true },
    { id: 3, link: '/settings', icon: 'rr-settings', title: 'Настройки', soon: true },
  ]

  const dispatch = useAppDispatch()

  const handleRedirect = (event: MouseEvent, isSoon?: boolean) => {
    if (isSoon) {
      event.preventDefault()
      
    } else if (isMobail()) {
      dispatch(toggleHidden())
    }
  }

  return (
    <nav className="navigation">
      <div className="navigation__header">
        <div className="navigation__logo">Songix</div>
        <LayoutMainTrigger/>
      </div>
      {links.map(item => 
        <UILink
          key={item.id}
          className='navigation__link'
          nav={true}
          to={item.link}
          icon={item.icon}
          soon={item.soon}
          onClick={(event) => handleRedirect(event, item.soon)}
        >{item.title}</UILink>
      )}
    </nav>
  )
}