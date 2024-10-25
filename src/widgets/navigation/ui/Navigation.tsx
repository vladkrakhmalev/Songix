import './Navigation.scss'
import { UILink } from "@shared/ui/link"

export const Navigation = () => {

  return (
    <nav className="navigation">
      {/* <UILink className='navigation__link' nav={true} to="/" icon='rr-apps'>Главная</UILink> */}
      <UILink className='navigation__link' nav={true} to="/collections" icon='rr-music-alt'>Сборники</UILink>
      <UILink className='navigation__link' nav={true} to="/profile" icon='rr-user'>Профиль</UILink>
      {/* <UILink className='navigation__link' nav={true} to="/settings" icon='rr-settings'>Настройки</UILink> */}
    </nav>
  )
}