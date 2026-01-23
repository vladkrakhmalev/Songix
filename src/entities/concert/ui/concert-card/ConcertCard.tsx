import { ReactNode } from 'react'
import './ConcertCard.scss'
import { IConcert } from '../../model/concertType'
import { useTranslation } from 'react-i18next'

interface IProps {
  concert: IConcert
  children?: ReactNode
}

export function ConcertCard({ concert, children }: IProps) {
  const { t } = useTranslation()

  return (
    <div className='concert-card'>
      <div className='concert-card__header'>
        <h3 className='concert-card__title'>{concert.name}</h3>
        {children}
      </div>
      <p className='concert-card__date'>
        {t('Date: {{value}}', { value: concert.date })}
      </p>
    </div>
  )
}
