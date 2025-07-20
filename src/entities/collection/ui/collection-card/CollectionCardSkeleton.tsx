import { FC } from 'react'
import './CollectionCard.scss'
import { Skeleton } from '@shared/ui/skeleton'

export const CollectionCardSkeleton: FC = () => {
  return (
    <div className='collection-card'>
      <Skeleton />

      <div className='collection-card__count'>
        Песен: <Skeleton width='50px' />
      </div>
    </div>
  )
}
