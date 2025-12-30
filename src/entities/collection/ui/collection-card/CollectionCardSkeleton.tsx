import './CollectionCard.scss'
import { Skeleton } from '@shared/ui/skeleton'

export function CollectionCardSkeleton() {
  return (
    <div className='collection-card'>
      <div className='collection-card__header'>
        <Skeleton variant='secondary' />
        <Skeleton variant='secondary' width='30px' />
        <Skeleton variant='secondary' width='30px' />
      </div>

      <div className='collection-card__count'>
        Песен: <Skeleton width='50px' variant='secondary' />
      </div>
    </div>
  )
}
