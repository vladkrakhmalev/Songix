import { useTranslation } from 'react-i18next'

export function SongContentEmtpy() {
  const { t } = useTranslation()

  return (
    <div className='song-content'>
      <h1>{t('Something went wrong while loading the song')}</h1>
      <p className='song-content__message'>
        {t('This song does not exist or is not available to you')}
      </p>
    </div>
  )
}
