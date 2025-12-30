import { Skeleton } from '@shared/ui/skeleton'

export function SongContentSkeleton() {
  return (
    <div className='song-content'>
      <div className='song-content__header'>
        <Skeleton variant='secondary' height='40px' />
        <Skeleton variant='secondary' height='40px' />
      </div>

      <div className='song-content__text'>
        <Skeleton variant='secondary' height='600px' />
      </div>
    </div>
  )
}
