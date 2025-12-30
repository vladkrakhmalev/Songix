import { beforeEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@shared/tests/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { THEME_STORAGE_KEY } from '../model/theme'

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('switches to dark theme and saves preference', async () => {
    renderWithProviders(<ThemeSwitcher />)

    await userEvent.click(screen.getByRole('button', { name: 'Тёмная' }))

    await waitFor(() => {
      expect(
        document.documentElement.classList.contains('dark-theme')
      ).toBe(true)
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    })
  })
})
