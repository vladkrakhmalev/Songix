import { useState } from 'react'
import { Button } from '@shared/ui/button'
import type { ICounterItem } from '@shared/ui/counter'

interface IProps {
  element: HTMLDivElement | null
  speed: ICounterItem
}

export function ScrollElement({ speed, element }: IProps) {
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [scroll, setScroll] = useState<NodeJS.Timeout>()

  function toggleScroll() {
    if (!isScrolling && element) {
      setScroll(
        setInterval(() => {
          element.scrollBy({ top: Number(speed.value), behavior: 'smooth' })
        }, 1)
      )
    } else clearInterval(scroll)
    setIsScrolling(!isScrolling)
  }

  return (
    <Button
      variant={isScrolling ? 'accent' : 'primary'}
      icon='chevron-double-down'
      onClick={toggleScroll}
    />
  )
}
