import './Input.scss'
import {
  useState,
  MouseEvent,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react'
import clsx from 'clsx'
import { Button } from '../button'
import { useKeyboard } from '@shared/hooks'

interface IInput {
  value: string
  children?: string
  type?: 'text' | 'password' | 'search' | 'independent' | 'date'
  error?: string
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary'
  shouldFocus?: boolean
  onChange: (value: string) => void
  onSave?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function Input(props: IInput) {
  const {
    value: defaultValue,
    children,
    type = 'text',
    error,
    disabled = false,
    className,
    variant = 'primary',
    shouldFocus,
    onChange,
    onSave,
    onFocus,
    onBlur,
  } = props

  const [fieldType, setFieldType] = useState(type)
  const [text, setText] = useState<string>(defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  function togglePassword(event: MouseEvent) {
    event.preventDefault()

    if (fieldType === 'password') {
      setFieldType('text')
    } else {
      setFieldType('password')
    }
  }

  function handlerChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value)
    onChange(event.target.value)
  }

  function handleSave() {
    onSave?.(text)
  }

  const handleFocus = useCallback(() => {
    if (disabled) return
    inputRef.current?.focus()
    setIsFocused(true)
    onFocus?.()
  }, [disabled, onFocus])

  function handleBlur() {
    inputRef.current?.blur()
    setIsFocused(false)
    onBlur?.()
  }

  useEffect(() => {
    if (shouldFocus) handleFocus()
  }, [inputRef, shouldFocus, handleFocus])

  useKeyboard(
    {
      Enter: handleSave,
      Escape: handleBlur,
    },
    {
      target: inputRef,
      focusOnly: true,
      preventDefault: true,
    }
  )

  const inputWrapperClass = clsx(
    className,
    'input__wrapper',
    error && '_error',
    variant && '_' + variant,
    isFocused && '_focused',
    disabled && '_disabled'
  )

  return (
    <div className='input' onClick={event => event.stopPropagation()}>
      <div className={inputWrapperClass}>
        <input
          ref={inputRef}
          className='input__field'
          placeholder={children}
          disabled={disabled}
          type={fieldType}
          value={defaultValue}
          onChange={handlerChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {type === 'password' && (
          <Button
            icon={clsx(fieldType === 'password' ? 'eye' : 'eye-crossed')}
            variant='transparent'
            className='input__button'
            onClick={togglePassword}
          />
        )}

        {type === 'search' && defaultValue && (
          <Button
            icon='cross-small'
            variant='transparent'
            className='input__button'
            onClick={() => onChange('')}
          />
        )}

        {type === 'independent' && (
          <Button
            icon='disk'
            variant='transparent'
            disabled={!text}
            className='input__button'
            onClick={handleSave}
          />
        )}
      </div>

      {error && <p className='input__message'>* {error}</p>}
    </div>
  )
}
