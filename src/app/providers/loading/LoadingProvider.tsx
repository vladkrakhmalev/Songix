import { Skeleton } from '@shared/ui/skeleton'
import { Suspense } from 'react'
import './LoadingProvider.scss'

interface IProps {
  children: React.ReactNode
}

export function LoadingProvider({ children }: IProps) {
  const fallback = (
    <div className='loading-provider'>
      <Skeleton height='100%' radius='1rem' />
    </div>
  )

  return <Suspense fallback={fallback}>{children}</Suspense>
}
