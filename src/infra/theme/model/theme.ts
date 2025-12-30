import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export const THEME_STORAGE_KEY = 'theme'

export const themeClassName: Record<Exclude<Theme, 'system'>, string> = {
  light: 'light-theme',
  dark: 'dark-theme',
}

export const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

export function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark' || value === 'system'
}
