import { UILink } from '@shared/ui/link'
import { RegistrationForm } from '@features/register'

const RegistrationPage = () => {
  return (
    <>
      <h1>Зарегистироваться</h1>
      <RegistrationForm />
      <UILink to='/login'>Войти</UILink>
    </>
  )
}

export default RegistrationPage
