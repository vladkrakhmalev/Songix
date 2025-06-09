import { useEffect, useRef, useState, type Key } from 'react'
import { DEFAULT_TRANSITION_DELAY } from './transitionConfig'

interface UseTransitionListProps<T> {
  items: T[]
  delay?: number
  renderKey: (item: T) => Key
}

export function useTransitionList<T>({
  items,
  delay = DEFAULT_TRANSITION_DELAY,
  renderKey,
}: UseTransitionListProps<T>) {
  const [allItems, setAllItems] = useState(items)
  const [visibleKeys, setVisibleKeys] = useState(new Set(items.map(renderKey)))
  const prevItemsRef = useRef(items)

  useEffect(() => {
    const prevItems = prevItemsRef.current
    const prevKeys = new Set(prevItems.map(renderKey))
    const currentKeys = new Set(items.map(renderKey))

    const addedKeys = [...currentKeys].filter(k => !prevKeys.has(k))
    const removedKeys = [...prevKeys].filter(k => !currentKeys.has(k))

    if (addedKeys.length > 0) {
      const addedItems = items.filter(i => addedKeys.includes(renderKey(i)))
      setAllItems(prev => [...prev, ...addedItems])
    }

    setVisibleKeys(prev => {
      const newVisible = new Set(prev)
      addedKeys.forEach(k => newVisible.add(k))

      if (removedKeys.length > 0) {
        removedKeys.forEach(k => newVisible.delete(k))
        setTimeout(() => {
          setAllItems(prev =>
            prev.filter(item => !removedKeys.includes(renderKey(item)))
          )
        }, delay)
      }

      return newVisible
    })

    prevItemsRef.current = items
  }, [items, delay, renderKey])

  return { allItems, visibleKeys }
}
