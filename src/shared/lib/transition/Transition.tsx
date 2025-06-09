import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { DEFAULT_TRANSITION_DELAY } from './transitionConfig'

export type TTransitionState = 'entering' | 'entered' | 'exiting' | 'exited'

interface TransitionProps {
  in: boolean
  children: ReactNode
  delay?: number
}

export function Transition({
  in: inProp,
  children,
  delay = DEFAULT_TRANSITION_DELAY,
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

  return <div className={`transition-${state}`}>{isVisible && children}</div>
}
