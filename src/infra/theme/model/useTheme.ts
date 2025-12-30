import { useCallback, useEffect, useMemo, useState } from 'react'
import { THEME_STORAGE_KEY, Theme, themeClassName, isTheme } from './theme'

function getSystemTheme(): Exclude<Theme, 'system'> {
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

function applyThemeClass(resolvedTheme: Exclude<Theme, 'system'>) {
  const root = document.documentElement
  root.classList.remove(themeClassName.light, themeClassName.dark)
  root.classList.add(themeClassName[resolvedTheme])
}

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored && isTheme(stored) ? stored : 'system'
}

export function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

  const applyTheme = useCallback((nextTheme: Theme) => {
    const resolvedTheme = nextTheme === 'system' ? getSystemTheme() : nextTheme
    applyThemeClass(resolvedTheme)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [applyTheme, theme])

  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mediaQuery) return

    function handleChange() {
      applyTheme('system')
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [applyTheme, theme])

  return useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )
}
