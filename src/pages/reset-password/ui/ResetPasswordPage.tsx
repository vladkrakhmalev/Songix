import { UILink } from '@shared/ui/link'
import { ResetPasswordForm } from '@features/reset-password'

export const ResetPasswordPage = () => {
  return (
    <>
      <h1>Восстановить пароль</h1>
      <ResetPasswordForm />
      <UILink to='/login'>Войти</UILink>
    </>
  )
}
