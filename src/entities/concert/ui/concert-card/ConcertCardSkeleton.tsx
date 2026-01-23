import './ConcertCard.scss'
import { Skeleton } from '@shared/ui/skeleton'

export function ConcertCardSkeleton() {
  return (
    <div className='concert-card'>
      <div className='concert-card__header'>
        <Skeleton variant='secondary' />
        <Skeleton variant='secondary' width='30px' />
        <Skeleton variant='secondary' width='30px' />
      </div>
      <div className='concert-card__date'>
        <Skeleton width='120px' variant='secondary' />
      </div>
    </div>
  )
}
