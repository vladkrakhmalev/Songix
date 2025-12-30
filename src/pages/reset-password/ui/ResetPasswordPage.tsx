import { UILink } from '@shared/ui/link'
import { ResetPasswordForm } from '@features/reset-password'
import { routerConfig } from '@shared/config/routerConfig'

export const ResetPasswordPage = () => {
  return (
    <>
      <h1>Восстановить пароль</h1>
      <ResetPasswordForm />
      <UILink to={routerConfig.login}>Войти</UILink>
    </>
  )
}
