import { UILink } from '@shared/ui/link'
import { RegistrationForm } from '@features/register'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'
import { NAMESPACES } from '@infra/translations'

function RegistrationPage() {
  const { t } = useTranslation(NAMESPACES.auth)

  return (
    <>
      <h1>{t('Sign up')}</h1>
      <RegistrationForm />
      <UILink to={routes.login()}>{t('Sign in')}</UILink>
    </>
  )
}

export default RegistrationPage
