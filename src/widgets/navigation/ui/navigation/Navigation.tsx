import './Navigation.scss'
import { Button } from '@shared/ui/button'
import { routes } from '@infra/router'

type TNavigationItem = {
  link: string
  icon: string
  title: string
}

const NAVIGATION_ITEMS: TNavigationItem[] = [
  { link: routes.collections(), icon: 'music-alt', title: 'Сборники' },
  { link: routes.settings(), icon: 'settings', title: 'Настройки' },
] as const

export const Navigation = () => {
  return (
    <nav className='navigation'>
      {NAVIGATION_ITEMS.map(item => (
        <Button
          key={item.link}
          icon={item.icon}
          to={item.link}
          size='small'
          variant='transparent'
        >
          {item.title}
        </Button>
      ))}
    </nav>
  )
}
