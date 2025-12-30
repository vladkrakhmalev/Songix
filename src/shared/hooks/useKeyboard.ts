import { useEffect, useCallback, RefObject } from 'react'

export type KeyboardHandler = (event: KeyboardEvent) => void

export interface KeyboardConfig {
  /** Элемент, на котором слушать события (по умолчанию document) */
  target?: RefObject<HTMLElement> | HTMLElement | null
  /** Слушать события только когда элемент в фокусе */
  focusOnly?: boolean
  /** Условие для активации слушателя */
  enabled?: boolean
  /** Предотвращать стандартное поведение браузера */
  preventDefault?: boolean
}

export interface KeyboardHandlers {
  [key: string]: KeyboardHandler
}

/**
 * Универсальный хук для обработки клавиатурных событий
 *
 * @param handlers - объект с обработчиками клавиш
 * @param config - конфигурация хука
 *
 * @example
 * // Простое использование
 * useKeyboard({
 *   'Escape': () => onClose(),
 *   'Enter': () => onSubmit()
 * })
 *
 * @example
 * // С конфигурацией
 * useKeyboard({
 *   'Escape': () => onClose(),
 *   'Enter': () => onSubmit()
 * }, {
 *   target: inputRef,
 *   focusOnly: true,
 *   enabled: isOpen
 * })
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
