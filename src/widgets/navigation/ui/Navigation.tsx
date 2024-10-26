import { LayoutMainTrigger, toggleHidden } from '@features/toggle-layout'
import './Navigation.scss'
import { UILink } from "@shared/ui/link"

export const Navigation = () => {

  const links = [
    // { id: 0, link: '/', icon: 'rr-apps', title: 'Главная' },
    { id: 1, link: '/collections', icon: 'rr-music-alt', title: 'Сборники' },
    { id: 2, link: '/profile', icon: 'rr-user', title: 'Профиль', soon: true },
    { id: 3, link: '/settings', icon: 'rr-settings', title: 'Настройки', soon: true },
  ]

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
          onClick={event => event.preventDefault()}
        >{item.title}</UILink>
      )}
    </nav>
  )
}