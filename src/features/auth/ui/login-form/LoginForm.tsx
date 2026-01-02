import '../AuthForm.scss'
import { authApi } from '@entities/auth'
import { useAuthForm } from '@features/auth/model/useAuthForm'
import { routes } from '@infra/router'
import { NAMESPACES } from '@infra/translations'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const LOGIN_ERRORS = {
  400: 'Incorrect email or password',
  500: 'An error occurred on the server side',
} as const

type LoginDto = { email: string; password: string }

// TODO: Добавить валидацию

export function LoginForm() {
  const { t } = useTranslation(NAMESPACES.auth)
  const navigate = useNavigate()

  const [login, state] = authApi.useLoginMutation()

  const {
    form,
    change,
    handleSubmit,
    errorMessage,
    isLoading,
    isSubmitDisabled,
  } = useAuthForm<LoginDto>({
    initialValues: { email: '', password: '' },
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    serverError: state.error,
    errorsMap: LOGIN_ERRORS,
    submit: values => void login(values),
    onSuccess: () => navigate(routes.collections()),
  })

  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <Input
        value={form.email}
        disabled={isLoading}
        onChange={v => change('email', v)}
      >
        {t('Email')}
      </Input>

      <Input
        type='password'
        value={form.password}
        disabled={isLoading}
        onChange={v => change('password', v)}
      >
        {t('Password')}
      </Input>

      {errorMessage && <p className='auth-form__error'>{errorMessage}</p>}

      <Button variant='accent' disabled={isSubmitDisabled} type='submit'>
        {t('Sign in')}
      </Button>
    </form>
  )
}
