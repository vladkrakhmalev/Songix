import { useEffect, useRef, useState } from 'react'
import { Button } from '@shared/ui/button'
import type { ICounterItem } from '@shared/ui/counter'

interface IProps {
  element: HTMLDivElement | null
  speed: ICounterItem
}

const DELAY = 16 // ~60fps

export function ScrollElement({ speed, element }: IProps) {
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isScrolling || !element) return

    intervalRef.current = setInterval(() => {
      const { scrollTop, scrollHeight, clientHeight } = element
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsScrolling(false)
        return
      }
      element.scrollBy({ top: Number(speed.value), behavior: 'smooth' })
    }, DELAY)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isScrolling, speed.value, element])

  function toggleScroll() {
    if (!element) return
    setIsScrolling(prev => !prev)
  }

  return (
    <Button
      variant={isScrolling ? 'accent' : 'primary'}
      icon='chevron-double-down'
      onClick={toggleScroll}
    />
  )
}
