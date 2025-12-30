import { UILink } from '@shared/ui/link'
import { LoginForm } from '@features/auth'
import { routes } from '@infra/router'

const LoginPage = () => {
  return (
    <>
      <h1>Вход в аккаунт</h1>
      <LoginForm />
      <UILink to={routes.registration()}>Зарегестироваться</UILink>
    </>
  )
}
export default LoginPage
