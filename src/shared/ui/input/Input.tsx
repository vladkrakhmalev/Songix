import './Input.scss'
import {
  FC,
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
  type?: 'text' | 'password' | 'search' | 'independent'
  error?: string
  disabled?: boolean
  className?: string
  bg?: 'light'
  shouldFocus?: boolean
  onChange: (value: string) => void
  onSave?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Input: FC<IInput> = props => {
  const {
    value: defaultValue,
    children,
    type = 'text',
    error,
    disabled = false,
    className,
    bg,
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

  const togglePassword = (event: MouseEvent) => {
    event.preventDefault()

    if (fieldType === 'password') {
      setFieldType('text')
    } else {
      setFieldType('password')
    }
  }

  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    onChange(event.target.value)
  }

  const handleSave = () => {
    onSave?.(text)
  }

  const handleFocus = useCallback(() => {
    if (disabled) return
    inputRef.current?.focus()
    setIsFocused(true)
    onFocus?.()
  }, [disabled, onFocus])

  const handleBlur = () => {
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
    bg && '_' + bg,
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
            color='grey'
            icon={clsx(fieldType === 'password' ? 'rr-eye' : 'rr-eye-crossed')}
            onClick={togglePassword}
            className='input__button'
          />
        )}

        {type === 'search' && defaultValue && (
          <Button
            color='grey'
            icon='rr-cross-small'
            onClick={() => onChange('')}
            className='input__button'
          />
        )}

        {type === 'independent' && (
          <Button
            color='light'
            icon='rr-disk'
            onClick={handleSave}
            disabled={!text}
            className='input__button'
          />
        )}
      </div>

      {error && <p className='input__message'>* {error}</p>}
    </div>
  )
}
