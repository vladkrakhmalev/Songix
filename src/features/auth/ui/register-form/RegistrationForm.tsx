import '../AuthForm.scss'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useNavigate } from 'react-router-dom'
import { routes } from '@infra/router'
import { authApi } from '@entities/auth'
import { useAuthForm } from '../../model/useAuthForm'
import { useTranslation } from 'react-i18next'
import { NAMESPACES } from '@infra/translations'
import { RegistrationFormMessage } from './RegistrationFormMessage'

const REGISTRATION_ERRORS = {
  400: 'Incorrect email or password',
  409: 'A user with this email already exists',
  500: 'An error occurred on the server side',
} as const

type RegistrationDto = {
  email: string
  password: string
  repeatPassword: string
}

// TODO: Добавить валидацию

export function RegistrationForm() {
  const { t } = useTranslation(NAMESPACES.auth)
  const navigate = useNavigate()

  const [register, registerState] = authApi.useRegisterMutation()

  const {
    form,
    change,
    handleSubmit,
    errorMessage,
    isLoading,
    isSubmitDisabled,
  } = useAuthForm<RegistrationDto>({
    initialValues: { email: '', password: '', repeatPassword: '' },
    isLoading: registerState.isLoading,
    isSuccess: registerState.isSuccess,
    serverError: registerState.error,
    errorsMap: REGISTRATION_ERRORS,
    submit: values => void register(values),
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

      <Input
        type='password'
        value={form.repeatPassword}
        disabled={isLoading}
        onChange={v => change('repeatPassword', v)}
      >
        {t('Repeat password')}
      </Input>

      {errorMessage && <p className='auth-form__error'>{t(errorMessage)}</p>}

      <RegistrationFormMessage />

      <Button variant='accent' disabled={isSubmitDisabled} type='submit'>
        {t('Sign up')}
      </Button>
    </form>
  )
}
