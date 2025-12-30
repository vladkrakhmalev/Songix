import { UILink } from '@shared/ui/link'
import { LoginForm } from '@features/auth'

const LoginPage = () => {
  return (
    <>
      <h1>Вход в аккаунт</h1>
      <LoginForm />
      <UILink to='/registration'>Зарегестироваться</UILink>
    </>
  )
}
export default LoginPage
