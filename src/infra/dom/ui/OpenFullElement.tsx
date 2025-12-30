import { FC, useState } from 'react'
import { Button } from '@shared/ui/button'

interface IProps {
  element: HTMLDivElement | null
  onChange: (isFullSize: boolean) => void
}

export const OpenFullElement: FC<IProps> = ({ element, onChange }) => {
  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  const toggleFullScreen = () => {
    if (!isFullSize && element?.requestFullscreen) {
      element.requestFullscreen()
    } else if (element && document.fullscreenElement) {
      document.exitFullscreen()
    }

    setIsFullSize(!isFullSize)
    onChange(!isFullSize)
  }

  return (
    <Button
      variant={isFullSize ? 'accent' : 'primary'}
      icon={isFullSize ? 'compress' : 'expand'}
      onClick={toggleFullScreen}
    />
  )
}
