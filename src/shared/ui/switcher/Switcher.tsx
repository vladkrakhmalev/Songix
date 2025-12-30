import './Switcher.scss'
import { CSSProperties } from 'react'
import clsx from 'clsx'
import { Icon } from '@shared/ui/icon'

export interface SwitcherOption<T extends string> {
  title: string
  value: T
  icon?: string
}

interface SwitcherProps<T extends string> {
  options: SwitcherOption<T>[]
  value: T
  variant?: 'primary' | 'secondary'
  className?: string
  onSwitch: (value: T) => void
}

export function Switcher<T extends string>({
  options,
  value,
  variant = 'primary',
  className,
  onSwitch,
}: SwitcherProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex(option => option.value === value)
  )
  const safeCount = Math.max(1, options.length)

  const switcherStyle = {
    '--switcher-index': activeIndex,
    '--switcher-count': safeCount,
  } as CSSProperties

  function handleSwitch(nextValue: T) {
    if (nextValue === value) return
    onSwitch(nextValue)
  }

  return (
    <div
      className={clsx('switcher', '_' + variant, className)}
      style={switcherStyle}
    >
      <span className='switcher__active' aria-hidden='true' />

      {options.map(option => (
        <button
          key={option.value}
          className={clsx(
            'switcher__item',
            option.value === value && '_active'
          )}
          type='button'
          onClick={() => handleSwitch(option.value)}
        >
          {option.icon && <Icon name={option.icon} />}
          <span className='switcher__title'>{option.title}</span>
        </button>
      ))}
    </div>
  )
}
