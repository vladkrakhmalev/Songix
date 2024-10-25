import { FC } from 'react';
import './Textarea.scss'
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html'

interface ITextarea {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const sanitizeOptions = {
  allowedTags: ['br', 'div'],
}

export const Textarea: FC<ITextarea> = ({ value, placeholder, onChange, }) => {

  const showPlaceholder = placeholder && !value

  const handleChange = (value: string) => {
    const cleanText = sanitizeHtml(value, sanitizeOptions)
    onChange(cleanText)
  }

  return (
    <div className='textarea'>
      {showPlaceholder && (
        <span className="textarea__placeholder">
          {placeholder}
        </span>
      )}

      <ContentEditable
        className='textarea__field'
        html={value}
        onChange={event => handleChange(event.target.value)}
      />
    </div>
  )
}
