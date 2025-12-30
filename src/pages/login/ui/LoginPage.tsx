import { UILink } from '@shared/ui/link'
import { LoginForm } from '@features/login'
import { routerConfig } from '@shared/config/routerConfig'

export const LoginPage = () => {
  return (
    <>
      <h1>Вход в аккаунт</h1>
      <LoginForm />
      {/* <UILink to={routerConfig.resetPassword}>Востановить пароль</UILink> */}
      <UILink to={routerConfig.registration}>Зарегестироваться</UILink>
    </>
  )
}
