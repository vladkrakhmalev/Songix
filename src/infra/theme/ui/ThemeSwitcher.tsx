import { Switcher } from '@shared/ui/switcher'
import { useThemeContext } from '../model/useThemeContext'
import { Theme } from '../model/theme'
import { useTranslation } from 'react-i18next'

export function ThemeSwitcher() {
  const { t } = useTranslation()
  const { theme, setTheme } = useThemeContext()

  const options: { title: string; value: Theme }[] = [
    { title: t('Light'), value: 'light' },
    { title: t('Dark'), value: 'dark' },
    { title: t('System'), value: 'system' },
  ]

  return (
    <Switcher
      options={options}
      value={theme}
      variant='secondary'
      onSwitch={setTheme}
    />
  )
}
