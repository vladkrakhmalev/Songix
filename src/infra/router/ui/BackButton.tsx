import { Button } from '@shared/ui/button'
import { useNavigate } from 'react-router-dom'

interface IProps {
  to?: string
}

export function BackButton({ to }: IProps) {
  const navigate = useNavigate()

  function handleClick() {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <Button icon='arrow-small-left' size='small' onClick={handleClick}>
      Назад
    </Button>
  )
}
