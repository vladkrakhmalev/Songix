import { type Key, type ReactNode } from 'react'
import { Transition } from './Transition'
import { useTransitionList } from './useTransitionList'

interface IProps<T> {
  items: T[]
  isLoading?: boolean
  delay?: number
  className?: string
  preloadCount?: number
  preloadItem?: ReactNode
  renderItem: (item: T) => ReactNode
  renderKey: (item: T) => Key
}

export function TransitionList<T>({
  items,
  isLoading = false,
  delay,
  className,
  preloadCount = 5,
  preloadItem,
  renderItem,
  renderKey,
}: IProps<T>) {
  const { allItems, visibleKeys } = useTransitionList({
    items,
    delay,
    renderKey,
  })

  const preloadElements = Array.from({ length: preloadCount }, (_, index) => (
    <div key={`preload-${index}`}>{preloadItem}</div>
  ))

  const transitions = allItems.map(item => {
    const key = renderKey(item)
    return (
      <Transition key={key} in={visibleKeys.has(key)} delay={delay}>
        {renderItem(item)}
      </Transition>
    )
  })

  return (
    <>
      <Transition in={isLoading} delay={delay} className={className}>
        {preloadElements}
      </Transition>

      {!isLoading && <div className={className}>{transitions}</div>}
    </>
  )
}
