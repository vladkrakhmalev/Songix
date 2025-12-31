import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { RenameCollection } from './RenameCollection'
import { renderWithProviders } from '@shared/tests/test-utils'
import type { ICollection } from '@entities/collection'
import i18next from 'i18next'

const renameMock = vi.fn()

vi.mock('@entities/collection', async () => {
  const actual = await vi.importActual<typeof import('@entities/collection')>(
    '@entities/collection'
  )
  return {
    ...actual,
    collectionApi: {
      ...actual.collectionApi,
      useUpdateCollectionMutation: () => [renameMock, { isLoading: false }],
    },
  }
})

describe('RenameCollection', () => {
  const collection: ICollection = {
    id: 1,
    title: 'Старое название',
    songsCount: 2,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows validation error on empty value', async () => {
    renderWithProviders(<RenameCollection collection={collection} />)

    await userEvent.click(screen.getByRole('button'))

    const input = await screen.findByPlaceholderText('Название')
    await userEvent.clear(input)
    await userEvent.keyboard('{Enter}')

    expect(
      await screen.findByText(i18next.t('Title is required'), {
        exact: false,
      })
    ).toBeInTheDocument()
    expect(renameMock).not.toHaveBeenCalled()
  })

  it('renames collection and closes edit mode', async () => {
    renderWithProviders(<RenameCollection collection={collection} />)

    await userEvent.click(screen.getByRole('button'))

    const input = await screen.findByPlaceholderText('Название')
    await userEvent.clear(input)
    await userEvent.type(input, 'Новое имя')
    await userEvent.keyboard('{Enter}')

    expect(renameMock).toHaveBeenCalledWith({
      id: collection.id,
      data: { title: 'Новое имя' },
    })
    expect(screen.getByText('Новое имя')).toBeInTheDocument()
  })
})
