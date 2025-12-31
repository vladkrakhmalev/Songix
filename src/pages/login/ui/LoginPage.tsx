import { UILink } from '@shared/ui/link'
import { LoginForm } from '@features/auth'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'
import { NAMESPACES } from '@infra/translations'

function LoginPage() {
  const { t } = useTranslation(NAMESPACES.auth)

  return (
    <>
      <h1>{t('Sign in to your account')}</h1>
      <LoginForm />
      <UILink to={routes.registration()}>{t('Sign up')}</UILink>
    </>
  )
}
export default LoginPage
