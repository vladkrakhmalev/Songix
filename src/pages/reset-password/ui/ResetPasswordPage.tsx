import { UILink } from "@shared/ui/link";
import { ResetPassword } from "@entities/auth";

export const ResetPasswordPage = () => {

  return (
    <>
      <h1>Восстановить пароль</h1>
      <ResetPassword/>
      <UILink to='/login'>Войти</UILink>
    </>
  )
}