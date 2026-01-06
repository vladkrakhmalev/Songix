import { CSSProperties, useCallback, useRef, useState } from 'react'
import './Textarea.scss'
import ContentEditable from 'react-contenteditable'
import clsx from 'clsx'
import { sanitize } from '@shared/utils/sanitize'

type TextareaBaseProps = {
  value: string
  placeholder?: string
  style?: CSSProperties
  onFocus?: () => void
  onBlur?: () => void
}

type TextareaEditableProps = TextareaBaseProps & {
  readonly?: false
  onChange: (value: string) => void
}

type TextareaReadonlyProps = TextareaBaseProps & {
  readonly: true
  onChange?: (value: string) => void
}

type TextareaProps = TextareaEditableProps | TextareaReadonlyProps

export function Textarea({
  value,
  readonly,
  placeholder,
  style,
  onFocus,
  onBlur,
  onChange,
}: TextareaProps) {
  const showPlaceholder = placeholder && !value

  const textareaRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = useCallback(() => {
    if (readonly) return
    textareaRef.current?.focus()
    setIsFocused(true)
    onFocus?.()
  }, [readonly, onFocus])

  function handleBlur() {
    textareaRef.current?.blur()
    setIsFocused(false)
    onBlur?.()
  }

  function handleChange(value: string) {
    if (readonly) return
    const cleanText = sanitize(value)
    onChange(cleanText)
  }

  return (
    <div
      className={clsx(
        'textarea',
        isFocused && '_focused',
        readonly && '_readonly'
      )}
    >
      {showPlaceholder && (
        <span className='textarea__placeholder'>{placeholder}</span>
      )}

      <ContentEditable
        className='textarea__field'
        style={style}
        html={value}
        disabled={readonly}
        onChange={event => handleChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  )
}
