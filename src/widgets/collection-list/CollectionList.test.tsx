import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@shared/tests/test-utils'
import { screen } from '@testing-library/react'
import { CollectionList } from './CollectionList'
import type { ICollection } from '@entities/collection'
import i18next from 'i18next'

const getCollectionsMock = vi.fn()

vi.mock('@entities/collection', async () => {
  const actual = await vi.importActual<typeof import('@entities/collection')>(
    '@entities/collection'
  )
  return {
    ...actual,
    collectionApi: {
      ...actual.collectionApi,
      useGetCollectionsQuery: (...args: unknown[]) =>
        getCollectionsMock(...args),
    },
  }
})

vi.mock('@features/rename-collection', () => ({
  RenameCollection: ({ collection }: { collection: ICollection }) => (
    <h3>{collection.title}</h3>
  ),
}))

vi.mock('@features/delete-collection', () => ({
  DeleteCollection: () => <div data-testid='delete-collection' />,
}))

describe('CollectionList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows skeletons while loading', () => {
    getCollectionsMock.mockReturnValue({ data: [], isLoading: true })

    const { container } = renderWithProviders(<CollectionList />)
    expect(
      container.querySelectorAll('.collection-card').length
    ).toBeGreaterThan(0)
  })

  it('shows empty message when no collections', () => {
    getCollectionsMock.mockReturnValue({ data: [], isLoading: false })

    renderWithProviders(<CollectionList />)
    expect(
      screen.getByText(i18next.t('No collections yet'))
    ).toBeInTheDocument()
  })

  it('renders collection cards with counters', () => {
    const collections: ICollection[] = [
      { id: 1, title: 'A', songsCount: 2 },
      { id: 2, title: 'B', songsCount: 5 },
    ]
    getCollectionsMock.mockReturnValue({ data: collections, isLoading: false })

    renderWithProviders(<CollectionList />)

    expect(screen.getAllByText(/Песен:/)).toHaveLength(collections.length)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
