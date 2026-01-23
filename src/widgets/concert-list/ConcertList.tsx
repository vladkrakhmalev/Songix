import { DeleteConcert } from '@features/delete-concert'
import './ConcertList.scss'
import { concertApi, ConcertCard, ConcertCardSkeleton } from '@entities/concert'
import { SKELETON_ARRAY } from '@shared/ui/skeleton'
import { useTranslation } from 'react-i18next'

export function ConcertList() {
  const { t } = useTranslation()
  const { data: concerts = [], isLoading } = concertApi.useGetConcertsQuery()

  if (isLoading) {
    return (
      <div className='concert-list'>
        {SKELETON_ARRAY.map(skeleton => (
          <ConcertCardSkeleton key={skeleton} />
        ))}
      </div>
    )
  }

  if (!concerts.length) {
    return <p className='concert-list__message'>{t('No concerts yet')}</p>
  }

  return (
    <div className='concert-list'>
      {concerts.map(concert => (
        <ConcertCard key={concert.id} concert={concert}>
          <DeleteConcert concert={concert} />
        </ConcertCard>
      ))}
    </div>
  )
}
