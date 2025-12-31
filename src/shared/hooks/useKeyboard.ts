import { useEffect, useCallback, RefObject } from 'react'

export type KeyboardHandler = (event: KeyboardEvent) => void

export interface KeyboardConfig {
  target?: RefObject<HTMLElement> | HTMLElement | null
  focusOnly?: boolean
  enabled?: boolean
  preventDefault?: boolean
}

export interface KeyboardHandlers {
  [key: string]: KeyboardHandler
}

/**
 * Universal hook for handling keyboard events.
 *
 * @param handlers - map of key handlers
 * @param config - hook configuration
 */
export function useKeyboard(
  handlers: KeyboardHandlers,
  config: KeyboardConfig = {}
) {
  const {
    target,
    focusOnly = false,
    enabled = true,
    preventDefault = false,
  } = config

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      if (focusOnly && target) {
        const targetElement = 'current' in target ? target.current : target
        if (targetElement && document.activeElement !== targetElement) {
          return
        }
      }

      const handler = handlers[event.key]
      if (handler) {
        if (preventDefault) {
          event.preventDefault()
        }
        handler(event)
      }
    },
    [handlers, enabled, focusOnly, target, preventDefault]
  )

  useEffect(() => {
    if (!enabled) return

    const targetElement = target
      ? 'current' in target
        ? target.current
        : target
      : document

    if (!targetElement) return

    targetElement.addEventListener('keydown', handleKeyDown as EventListener)

    return () => {
      targetElement.removeEventListener(
        'keydown',
        handleKeyDown as EventListener
      )
    }
  }, [handleKeyDown, enabled, target])
}
