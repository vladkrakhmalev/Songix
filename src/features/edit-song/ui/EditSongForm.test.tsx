import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { EditSongForm } from './EditSongForm'
import { renderWithProviders, setupStore } from '@shared/tests/test-utils'
import type { ISong } from '@entities/song'
import { toggleEditMode } from '../model/editSongSlice'

const updateSongMock = vi.fn()

vi.mock('@entities/song', async () => {
  const actual =
    await vi.importActual<typeof import('@entities/song')>('@entities/song')
  return {
    ...actual,
    songApi: {
      ...actual.songApi,
      useUpdateSongMutation: () => [updateSongMock, { isLoading: false }],
    },
  }
})

describe('EditSongForm', () => {
  const song: ISong = {
    id: '5',
    collectionId: 1,
    title: 'Старая песня',
    text: 'text',
    tonalities: [],
    isFavorite: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('updates song and toggles edit mode off', async () => {
    updateSongMock.mockResolvedValueOnce({ data: { ...song, title: 'Новая' } })
    const store = setupStore()
    const dispatchSpy = vi.spyOn(store, 'dispatch')

    renderWithProviders(<EditSongForm song={song} />, { store })

    await userEvent.clear(screen.getByPlaceholderText('Название'))
    await userEvent.type(screen.getByPlaceholderText('Название'), 'Новая')
    await userEvent.click(screen.getByRole('button', { name: 'Сохранить' }))

    expect(updateSongMock).toHaveBeenCalledWith({
      id: song.id,
      data: { ...song, title: 'Новая' },
    })
    expect(dispatchSpy).toHaveBeenCalledWith(toggleEditMode())
  })
})
