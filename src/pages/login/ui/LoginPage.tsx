import { UILink } from "@shared/ui/link";
import { LoginForm } from "@entities/auth";

export const LoginPage = () => {

  return (
    <>
      <h1>Вход в аккаунт</h1>
      <LoginForm/>
      {/* <UILink to='/reset-password'>Востановить пароль</UILink> */}
      <UILink to='/registration'>Зарегестироваться</UILink>
    </>
  )
}