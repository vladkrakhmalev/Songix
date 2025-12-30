import { UILink } from '@shared/ui/link'
import { RegistrationForm } from '@features/register'
import { routes } from '@infra/router'

function RegistrationPage() {
  return (
    <>
      <h1>Зарегистироваться</h1>
      <RegistrationForm />
      <UILink to={routes.login()}>Войти</UILink>
    </>
  )
}

export default RegistrationPage
