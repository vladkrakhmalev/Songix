import { NAMESPACES } from '@infra/translations'
import { API_URL } from '@shared/config'
import { Button } from '@shared/ui/button'
import { useTranslation } from 'react-i18next'

export function GoogleLoginButton() {
  const { t } = useTranslation(NAMESPACES.auth)

  function handleGoogleLogin() {
    const googleAuthUrl = `${API_URL}/auth/google/`
    window.location.href = googleAuthUrl
  }

  return (
    <Button
      icon='google'
      iconStyle='brands'
      color='light'
      shouldFullWidth
      onClick={handleGoogleLogin}
    >
      {t('Sign in with Google')}
    </Button>
  )
}
