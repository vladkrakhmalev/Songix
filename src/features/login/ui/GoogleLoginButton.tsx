import { API_URL } from '@shared/config'
import { Button } from '@shared/ui/button'

export const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const googleAuthUrl = `${API_URL}/auth/google/`
    window.location.href = googleAuthUrl
  }

  return (
    <Button icon='brands-google' color='light' onClick={handleGoogleLogin}>
      Войти через Google
    </Button>
  )
}
