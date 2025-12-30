import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@shared/tests/test-utils'
import { screen } from '@testing-library/react'
import { LoginForm } from './LoginForm'
import { routerConfig } from '@shared/config'

const loginMock = vi.fn()
const navigateMock = vi.fn()

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
      useLoginMutation: () => [loginMock, { isLoading: false }],
    },
  }
})

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows error when credentials are invalid', async () => {
    loginMock.mockResolvedValueOnce({ error: true })

    renderWithProviders(<LoginForm />)

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@mail.com')
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'wrongpass')
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }))

    expect(
      await screen.findByText('Неверный email или пароль')
    ).toBeInTheDocument()
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('navigates to collections on successful login', async () => {
    loginMock.mockResolvedValueOnce({ data: { token: 'ok' } })

    renderWithProviders(<LoginForm />)

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@mail.com')
    await userEvent.type(screen.getByPlaceholderText('Пароль'), 'correct')
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }))

    expect(navigateMock).toHaveBeenCalledWith(routerConfig.collections)
  })
})
