import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { DEFAULT_TRANSITION_DELAY } from './transitionConfig'
import clsx from 'clsx'

export type TTransitionState = 'entering' | 'entered' | 'exiting' | 'exited'

interface TransitionProps {
  in: boolean
  children: ReactNode
  delay?: number
  className?: string
}

export function Transition({
  in: inProp,
  children,
  delay = DEFAULT_TRANSITION_DELAY,
  className,
}: TransitionProps) {
  const [state, setState] = useState<TTransitionState>('exited')

  const isVisible = state !== 'exited'

  useEffect(() => {
    if (inProp) {
      setState('entering')
      const timeout = setTimeout(() => setState('entered'), delay)
      return () => clearTimeout(timeout)
    } else {
      setState('exiting')
      const timeout = setTimeout(() => setState('exited'), delay)
      return () => clearTimeout(timeout)
    }
  }, [inProp, delay])

  return (
    <div className={clsx(`transition-${state}`, className)}>
      {isVisible && children}
    </div>
  )
}
