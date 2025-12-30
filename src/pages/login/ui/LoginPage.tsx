import { UILink } from '@shared/ui/link'
import { LoginForm } from '@features/auth'
import { routerConfig } from '@shared/config'

const LoginPage = () => {
  return (
    <>
      <h1>Вход в аккаунт</h1>
      <LoginForm />
      <UILink to={routerConfig.registration}>Зарегестироваться</UILink>
    </>
  )
}
export default LoginPage
