import { PropsWithChildren } from 'react'
import { ThemeContext } from '../model/theme'
import { useThemeState } from '../model/useTheme'

export function ThemeProvider({ children }: PropsWithChildren) {
  const value = useThemeState()

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
