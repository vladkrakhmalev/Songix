import { FC } from 'react';
import './Textarea.scss'
import ContentEditable from 'react-contenteditable';

interface ITextarea {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export const Textarea: FC<ITextarea> = ({ value, placeholder, onChange, }) => {

  const showPlaceholder = placeholder && !value

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
        onChange={event => onChange(event.target.value)}
      />
    </div>
  )
}
