import { useCallback, useRef, useState } from 'react'
import './Textarea.scss'
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'
import clsx from 'clsx'

interface ITextarea {
  value: string
  disabled?: boolean
  placeholder?: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

const sanitizeOptions = {
  allowedTags: ['br', 'div'],
}

export function Textarea({
  value,
  disabled,
  placeholder,
  onChange,
  onFocus,
  onBlur,
}: ITextarea) {
  const showPlaceholder = placeholder && !value

  const textareaRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const handleFocus = useCallback(() => {
    if (disabled) return
    textareaRef.current?.focus()
    setIsFocused(true)
    onFocus?.()
  }, [disabled, onFocus])

  function handleBlur() {
    textareaRef.current?.blur()
    setIsFocused(false)
    onBlur?.()
  }

  function handleChange(value: string) {
    const cleanText = sanitizeHtml(value, sanitizeOptions)
    onChange(cleanText)
  }

  return (
    <div className={clsx('textarea', isFocused && '_focused')}>
      {showPlaceholder && (
        <span className='textarea__placeholder'>{placeholder}</span>
      )}

      <ContentEditable
        className='textarea__field'
        html={value}
        onChange={event => handleChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  )
}
