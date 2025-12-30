import { useState } from 'react'
import { Button } from '@shared/ui/button'

interface IProps {
  element: HTMLDivElement | null
  onChange: (isFullSize: boolean) => void
}

export function OpenFullElement({ element, onChange }: IProps) {
  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  function toggleFullScreen() {
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
