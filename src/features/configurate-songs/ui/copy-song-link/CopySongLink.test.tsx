import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { CopySongLink } from './CopySongLink'
import { renderWithProviders } from '@shared/tests/test-utils'

describe('CopySongLink', () => {
  it('copies current url to clipboard and shows notification', async () => {
    if (!navigator.clipboard) {
      // @ts-expect-error define clipboard for test env
      navigator.clipboard = { writeText: vi.fn() }
    }
    const clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText')

    renderWithProviders(<CopySongLink />, {
      route: ['/collections/1/songs/2'],
    })

    await userEvent.click(screen.getByText('Поделиться'))

    expect(clipboardSpy).toHaveBeenCalledWith(
      `${window.location.origin}/collections/1/songs/2`
    )
    expect(await screen.findByText('Ссылка скопирована')).toBeInTheDocument()
  })
})
