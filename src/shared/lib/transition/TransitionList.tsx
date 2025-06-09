import { type Key, type ReactNode } from 'react'
import { Transition } from './Transition'
import { useTransitionList } from './useTransitionList'

interface IProps<T> {
  items: T[]
  className?: string
  delay?: number
  renderItem: (item: T) => ReactNode
  renderKey: (item: T) => Key
}

export function TransitionList<T>({
  items,
  className,
  delay,
  renderItem,
  renderKey,
}: IProps<T>) {
  const { allItems, visibleKeys } = useTransitionList({
    items,
    delay,
    renderKey,
  })

  const transitions = allItems.map(item => {
    const key = renderKey(item)
    return (
      <Transition key={key} in={visibleKeys.has(key)} delay={delay}>
        {renderItem(item)}
      </Transition>
    )
  })

  if (className) {
    return <div className={className}>{transitions}</div>
  }

  return transitions
}
