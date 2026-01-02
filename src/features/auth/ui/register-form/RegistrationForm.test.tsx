import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { RegistrationForm } from './RegistrationForm'
import { renderWithProviders } from '@shared/tests/test-utils'
import { routes } from '@infra/router'
import i18next from 'i18next'
import { NAMESPACES } from '@infra/translations'

const registerMock = vi.fn()
const navigateMock = vi.fn()
let mockRegisterData: unknown

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

vi.mock('@entities/auth', async () => {
  const actual =
    await vi.importActual<typeof import('@entities/auth')>('@entities/auth')
  return {
    ...actual,
    authApi: {
      ...actual.authApi,
      useRegisterMutation: () => [
        registerMock,
        {
          data: mockRegisterData,
        },
      ],
    },
  }
})

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockRegisterData = undefined
  })

  const fillForm = async () => {
    await userEvent.type(
      screen.getByPlaceholderText(i18next.t('Email', { ns: NAMESPACES.auth })),
      'user@mail.com'
    )
    await userEvent.type(
      screen.getByPlaceholderText(
        i18next.t('Password', { ns: NAMESPACES.auth })
      ),
      'secret123'
    )
    await userEvent.type(
      screen.getByPlaceholderText(
        i18next.t('Repeat password', { ns: NAMESPACES.auth })
      ),
      'secret123'
    )
  }

  it('navigates to collections on successful registration', async () => {
    mockRegisterData = { id: 1 }
    registerMock.mockResolvedValueOnce({ data: mockRegisterData })

    renderWithProviders(<RegistrationForm />)
    await fillForm()
    await userEvent.click(
      screen.getByRole('button', {
        name: i18next.t('Sign up', { ns: NAMESPACES.auth }),
      })
    )

    expect(navigateMock).toHaveBeenCalledWith(routes.collections())
  })

  it('shows error when registration fails', async () => {
    mockRegisterData = undefined
    registerMock.mockResolvedValueOnce({ error: 'failed' })

    const { container } = renderWithProviders(<RegistrationForm />)
    await fillForm()
    await userEvent.click(
      screen.getByRole('button', {
        name: i18next.t('Sign up', { ns: NAMESPACES.auth }),
      })
    )

    await waitFor(() => {
      const errorNode = container.querySelector('.registration-form__error')
      expect(errorNode?.textContent).toContain('failed')
    })
    expect(navigateMock).not.toHaveBeenCalled()
  })
})
