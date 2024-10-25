import './Input.scss'
import { FC, useState, MouseEvent } from 'react'
import clsx from 'clsx'
import { Button } from '../button'

interface IInput {
  children: string
  disabled?: boolean
  error?: string
  className?: string
  type?: 'text' | 'password' | 'search' | 'independent'
  value: string
  bg?: 'light'
  onChange: (value: string) => void
  onSave?: (value: string) => void
}

export const Input: FC<IInput> = (props) => {
  const {
    children,
    className,
    type = 'text',
    error,
    disabled = false,
    onChange,
    onSave,
    value: defaultValue,
    bg,
  } = props

  const [fieldType, setFieldType] = useState(type)
  const [text, setText] = useState<string>(defaultValue)

  const togglePassword = (event: MouseEvent) => {
    event.preventDefault()

    if (fieldType === 'password') {
      setFieldType('text')
    } else {
      setFieldType('password')
    }
  }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    onChange(event.target.value)
  }
  
  const handleSave = () => {
    onSave && onSave(text)
  }

  const inputClass = clsx(className, 'input', error && '_error', bg && '_' + bg)

  return (
    <div className={inputClass} onClick={event => event.preventDefault()}>
      <div className="input__wrapper">
        <input
          className='input__field'
          placeholder={children}
          disabled={disabled}
          onChange={handlerChange}
          type={fieldType}
          value={defaultValue}
        />

        {type === 'password' &&
          <Button
            color='grey'
            icon={clsx(fieldType === 'password' ? 'rr-eye' : 'rr-eye-crossed')}
            onClick={togglePassword}
            className='input__button'
          />
        }

        {type === 'search' && defaultValue &&
          <Button
            color='grey'
            icon='rr-cross-small'
            onClick={() => onChange('')}
            className='input__button'
          />
        }

        {type === 'independent' &&
          <Button
            color='light'
            icon='rr-disk'
            onClick={handleSave}
            disabled={text ? false : true}
            className='input__button'
          />
        }
      </div>

      {error && <p className="input__message">* {error}</p>}
    </div>
  )
  
}