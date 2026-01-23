import { ConcertList } from '@widgets/concert-list'
import './ConcertsPage.scss'
import { CreateConcert } from '@features/create-concert'
import { useTranslation } from 'react-i18next'

function ConcertsPage() {
  const { t } = useTranslation()

  return (
    <div className='concerts-page'>
      <div className='concerts-page__header'>
        <h1>{t('Concerts')}</h1>
        <CreateConcert />
      </div>

      <ConcertList />
    </div>
  )
}

export default ConcertsPage
