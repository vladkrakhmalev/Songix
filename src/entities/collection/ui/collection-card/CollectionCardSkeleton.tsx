import './CollectionCard.scss'
import { Skeleton } from '@shared/ui/skeleton'
import { useTranslation } from 'react-i18next'

export function CollectionCardSkeleton() {
  const { t } = useTranslation()

  return (
    <div className='collection-card'>
      <div className='collection-card__header'>
        <Skeleton variant='secondary' />
        <Skeleton variant='secondary' width='30px' />
        <Skeleton variant='secondary' width='30px' />
      </div>

      <div className='collection-card__count'>
        {t('Songs: {{value}}', { value: '' })}
        <Skeleton width='50px' variant='secondary' />
      </div>
    </div>
  )
}
