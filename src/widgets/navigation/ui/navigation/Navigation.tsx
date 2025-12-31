import './Navigation.scss'
import { Button } from '@shared/ui/button'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'

type TNavigationItem = {
  link: string
  icon: string
  title: string
}

export function Navigation() {
  const { t } = useTranslation()

  const navigationItems: TNavigationItem[] = [
    { link: routes.collections(), icon: 'music-alt', title: t('Collections') },
    { link: routes.settings(), icon: 'settings', title: t('Settings') },
  ] as const

  return (
    <nav className='navigation'>
      {navigationItems.map(item => (
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
