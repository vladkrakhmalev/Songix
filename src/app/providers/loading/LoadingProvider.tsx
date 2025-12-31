import { Skeleton } from '@shared/ui/skeleton'
import { PropsWithChildren, Suspense } from 'react'
import './LoadingProvider.scss'

export function LoadingProvider({ children }: PropsWithChildren) {
  const fallback = (
    <div className='loading-provider'>
      <Skeleton height='100%' radius='1rem' />
    </div>
  )

  return <Suspense fallback={fallback}>{children}</Suspense>
}
