import { FC } from 'react'
import { Button } from '@shared/ui/button'
import { authApi } from '@entities/auth'
import { useNavigate } from 'react-router-dom'

export const LogoutButton: FC = () => {
  const [logout] = authApi.useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Button variant='danger' icon='sign-out-alt' onClick={handleLogout}>
      Выйти
    </Button>
  )
}
