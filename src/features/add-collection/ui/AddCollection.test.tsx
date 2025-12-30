import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { AddCollection } from './AddCollection'
import { renderWithProviders } from '@shared/tests/test-utils'

const addCollectionMock = vi.fn()

vi.mock('@entities/collection', async () => {
  const actual = await vi.importActual<typeof import('@entities/collection')>(
    '@entities/collection'
  )

  return {
    ...actual,
    collectionApi: {
      ...actual.collectionApi,
      useAddCollectionMutation: () => [addCollectionMock, { isLoading: false }],
    },
  }
})

describe('AddCollection', () => {
  beforeEach(() => {
    addCollectionMock.mockReset()
  })

  it('shows validation error when title is empty', async () => {
    renderWithProviders(<AddCollection />)

    const trigger = screen.getAllByRole('button')[0]
    await userEvent.click(trigger)

    const createButton = await screen.findByRole('button', { name: 'Создать' })
    await userEvent.click(createButton)

    expect(
      await screen.findByText('* Название должно быть заполнено')
    ).toBeInTheDocument()
    expect(addCollectionMock).not.toHaveBeenCalled()
  })

  it('submits valid title and closes modal', async () => {
    renderWithProviders(<AddCollection />)

    const trigger = screen.getAllByRole('button')[0]
    await userEvent.click(trigger)

    const input = await screen.findByPlaceholderText('Название')
    await userEvent.type(input, 'Новый сборник')

    const createButton = await screen.findByRole('button', { name: 'Создать' })
    await userEvent.click(createButton)

    expect(addCollectionMock).toHaveBeenCalledWith('Новый сборник')
    expect(screen.queryByText('Создать новый сборник')).not.toBeInTheDocument()
  })
})
