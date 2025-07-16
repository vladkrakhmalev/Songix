import { FC } from 'react'
import './SongCard.scss'
import { Skeleton } from '@shared/ui/skeleton'

export const SongCardSkeleton: FC = () => {
  return (
    <div className='song-card'>
      <Skeleton variant='secondary' />
      <Skeleton variant='secondary' />
    </div>
  )
}
