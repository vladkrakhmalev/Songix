import { UILink } from '@shared/ui/link'
import { RegistrationForm } from '@features/register'
import { routerConfig } from '@shared/config/routerConfig'

export const RegistrationPage = () => {
  return (
    <>
      <h1>Зарегистироваться</h1>
      <RegistrationForm />
      <UILink to={routerConfig.login}>Войти</UILink>
    </>
  )
}
