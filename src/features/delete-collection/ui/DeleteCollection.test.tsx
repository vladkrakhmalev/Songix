import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { DeleteCollection } from './DeleteCollection'
import { renderWithProviders } from '@shared/tests/test-utils'
import type { ICollection } from '@entities/collection'

const deleteMock = vi.fn()

vi.mock('@entities/collection', async () => {
  const actual = await vi.importActual<typeof import('@entities/collection')>(
    '@entities/collection'
  )
  return {
    ...actual,
    collectionApi: {
      ...actual.collectionApi,
      useDeleteCollectionMutation: () => [deleteMock, { isLoading: false }],
    },
  }
})

describe('DeleteCollection', () => {
  const collection: ICollection = {
    id: 7,
    title: 'Удаляемый',
    songsCount: 0,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('opens confirmation modal and deletes collection', async () => {
    renderWithProviders(<DeleteCollection collection={collection} />)

    await userEvent.click(screen.getByRole('button'))

    expect(
      await screen.findByText(/Вы точно хотите удалить сборник/)
    ).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Удалить' }))

    expect(deleteMock).toHaveBeenCalledWith(collection.id)
  })
})
