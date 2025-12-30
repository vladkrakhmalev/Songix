import { Switcher } from '@shared/ui/switcher'
import { useThemeContext } from '../model/useThemeContext'
import { Theme } from '../model/theme'

const options: { title: string; value: Theme }[] = [
  { title: 'Светлая', value: 'light' },
  { title: 'Тёмная', value: 'dark' },
  { title: 'Системная', value: 'system' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext()

  return (
    <Switcher
      options={options}
      value={theme}
      variant='secondary'
      onSwitch={setTheme}
    />
  )
}
