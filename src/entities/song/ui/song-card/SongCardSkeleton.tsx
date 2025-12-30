import './SongCard.scss'
import { Skeleton } from '@shared/ui/skeleton'

export function SongCardSkeleton() {
  return (
    <div className='song-card'>
      <Skeleton variant='secondary' />
      <Skeleton variant='secondary' />
    </div>
  )
}
