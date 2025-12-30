import { UILink } from '@shared/ui/link'
import { ResetPasswordForm } from '@features/reset-password'
import { routes } from '@infra/router'

const ResetPasswordPage = () => {
  return (
    <>
      <h1>Восстановить пароль</h1>
      <ResetPasswordForm />
      <UILink to={routes.login()}>Войти</UILink>
    </>
  )
}

export default ResetPasswordPage
