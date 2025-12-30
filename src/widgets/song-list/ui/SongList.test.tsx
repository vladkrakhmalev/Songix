import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders, setupStore } from '@shared/tests/test-utils'
import { screen } from '@testing-library/react'
import type { ISong } from '@entities/song'
import { SongList } from './SongList'
import { CATEGORY_ITEM_LIST } from '@entities/category'

const getSongsMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ collectionId: '1' }),
  }
})

vi.mock('@entities/song', async () => {
  const actual =
    await vi.importActual<typeof import('@entities/song')>('@entities/song')
  return {
    ...actual,
    songApi: {
      ...actual.songApi,
      useGetSongsByCollectionIdQuery: (...args: unknown[]) =>
        getSongsMock(...args),
    },
  }
})

vi.mock('@features/like-song', () => ({
  LikeSong: ({ song }: { song: ISong }) => (
    <div data-testid={`like-${song.id}`} />
  ),
}))

describe('SongList', () => {
  const songs: ISong[] = [
    {
      id: '1',
      collectionId: 1,
      title: 'Первый',
      text: 'text',
      isFavorite: false,
      tonalities: [],
      categories: ['Избранные'],
    },
    {
      id: '2',
      collectionId: 1,
      title: 'Второй',
      text: 'text',
      isFavorite: false,
      tonalities: [],
      categories: ['Торжественные'],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders skeletons when loading', () => {
    getSongsMock.mockReturnValue({ data: [], isLoading: true })
    const { container } = renderWithProviders(<SongList />)
    expect(container.querySelectorAll('.song-card').length).toBeGreaterThan(0)
  })

  it('filters by search query', () => {
    getSongsMock.mockReturnValue({ data: songs, isLoading: false })
    const store = setupStore({
      filterSongs: {
        search: 'пер',
        categories: CATEGORY_ITEM_LIST,
      },
    })

    renderWithProviders(<SongList />, { store })

    expect(screen.getByText('Первый')).toBeInTheDocument()
    expect(screen.queryByText('Второй')).toBeNull()
  })

  it('shows empty message when nothing matches', () => {
    getSongsMock.mockReturnValue({ data: songs, isLoading: false })
    const store = setupStore({
      filterSongs: {
        search: 'нет совпадений',
        categories: CATEGORY_ITEM_LIST,
      },
    })

    renderWithProviders(<SongList />, { store })

    expect(screen.getByText('Ничего не найдено')).toBeInTheDocument()
  })
})
