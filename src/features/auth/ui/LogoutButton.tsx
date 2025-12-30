import { Button } from '@shared/ui/button'
import { authApi } from '@entities/auth'
import { routes } from '@infra/router'
import { useNavigate } from 'react-router-dom'

export function LogoutButton() {
  const [logout] = authApi.useLogoutMutation()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate(routes.login())
  }

  return (
    <Button variant='danger' icon='sign-out-alt' onClick={handleLogout}>
      Выйти
    </Button>
  )
}
