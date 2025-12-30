import './Navigation.scss'
import { Button } from '@shared/ui/button'
import { routerConfig } from '@shared/config'

type TNavigationItem = {
  link: string
  icon: string
  title: string
}

const NAVIGATION_ITEMS: TNavigationItem[] = [
  { link: routerConfig.collections, icon: 'music-alt', title: 'Сборники' },
  { link: routerConfig.settings, icon: 'settings', title: 'Настройки' },
] as const

export const Navigation = () => {
  return (
    <nav className='navigation'>
      {NAVIGATION_ITEMS.map(item => (
        <Button
          key={item.link}
          variant='transparent'
          icon={item.icon}
          to={item.link}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  )
}
