import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { AddSongForm } from './AddSongForm'
import { renderWithProviders } from '@shared/tests/test-utils'
import { routes } from '@infra/router'
import i18next from 'i18next'

const addSongMock = vi.fn()
const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ collectionId: '10' }),
  }
})

vi.mock('@entities/song', async () => {
  const actual =
    await vi.importActual<typeof import('@entities/song')>('@entities/song')
  return {
    ...actual,
    songApi: {
      ...actual.songApi,
      useAddSongMutation: () => [addSongMock, { isLoading: false }],
    },
  }
})

describe('AddSongForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a song and navigates to newly created song', async () => {
    addSongMock.mockResolvedValueOnce({ data: { id: '99' } })

    const { container } = renderWithProviders(<AddSongForm collectionId='10' />)

    await userEvent.type(
      screen.getByPlaceholderText(i18next.t('Title')),
      'Новая песня'
    )
    const textarea = container.querySelector('.textarea__field') as HTMLElement
    await userEvent.type(textarea, 'Текст песни')
    await userEvent.click(
      screen.getByRole('button', { name: i18next.t('Save') })
    )

    expect(addSongMock).toHaveBeenCalledTimes(1)
    const payload = addSongMock.mock.calls[0][0]
    expect(payload.title).toBe('Новая песня')
    expect(String(payload.collectionId)).toBe('10')
    expect(payload.text).toContain('Текст песни')
    expect(navigateMock).toHaveBeenCalledWith(routes.song('10', '99'))
  })
})
