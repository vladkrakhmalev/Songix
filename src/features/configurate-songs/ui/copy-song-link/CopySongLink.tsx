import './CopySongLink.scss'
import { ConfigurateItem } from '../configurate-item'
import { useLocation } from 'react-router-dom'

export function CopySongLink() {
  const location = useLocation()

  function handleCopy() {
    const currentUrl = window.location.origin + location.pathname
    navigator.clipboard.writeText(currentUrl)
  }

  return (
    <>
      <ConfigurateItem
        icon='rr-share'
        title='Поделиться'
        onClick={handleCopy}
      />
    </>
  )
}
