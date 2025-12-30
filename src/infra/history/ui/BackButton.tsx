import { Button } from '@shared/ui/button'
import { useNavigate } from 'react-router-dom'

export function BackButton() {
  const navigate = useNavigate()

  return (
    <Button icon='arrow-small-left' size='small' onClick={() => navigate(-1)}>
      Назад
    </Button>
  )
}
