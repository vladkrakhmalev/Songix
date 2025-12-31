import { UILink } from '@shared/ui/link'
import { ResetPasswordForm } from '@features/reset-password'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'
import { NAMESPACES } from '@infra/translations'

function ResetPasswordPage() {
  const { t } = useTranslation(NAMESPACES.auth)
  return (
    <>
      <h1>{t('Recover password')}</h1>
      <ResetPasswordForm />
      <UILink to={routes.login()}>{t('Sign in')}</UILink>
    </>
  )
}

export default ResetPasswordPage
