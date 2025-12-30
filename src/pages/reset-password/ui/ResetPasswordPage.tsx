import { UILink } from '@shared/ui/link'
import { ResetPasswordForm } from '@features/reset-password'
import { routerConfig } from '@shared/config'

const ResetPasswordPage = () => {
  return (
    <>
      <h1>Восстановить пароль</h1>
      <ResetPasswordForm />
      <UILink to={routerConfig.login}>Войти</UILink>
    </>
  )
}

export default ResetPasswordPage
