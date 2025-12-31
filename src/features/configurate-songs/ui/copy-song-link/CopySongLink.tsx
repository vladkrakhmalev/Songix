import './CopySongLink.scss'
import { ConfigurateItem } from '../configurate-item'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function CopySongLink() {
  const { t } = useTranslation()
  const location = useLocation()

  function handleCopy() {
    const currentUrl = window.location.origin + location.pathname
    navigator.clipboard.writeText(currentUrl)
  }

  return (
    <>
      <ConfigurateItem
        icon='rr-share'
        title={t('Share')}
        onClick={handleCopy}
      />
    </>
  )
}
