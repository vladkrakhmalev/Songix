import './Input.scss'
import { FC, useState } from 'react'
import clsx from 'clsx'
import { Button } from '../button'

interface IInput {
  children: string
  disabled?: boolean
  error?: string
  className?: string
  type?: 'text' | 'password' | 'search'
  value: string
  bg?: 'light'
  onChange: (value: string) => void
}

export const Input: FC<IInput> = (props) => {
  const {
    children,
    className,
    type = 'text',
    error,
    disabled = false,
    onChange,
    value,
    bg,
  } = props

  const [fieldType, setFieldType] = useState(type)

  const togglePassword = (event: MouseEvent) => {
    event.preventDefault()

    if (fieldType === 'password') {
      setFieldType('text')
    } else {
      setFieldType('password')
    }
  }

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const inputClass = clsx(className, 'input', error && '_error', bg && '_' + bg)

  return (
    <div className={inputClass}>
      <div className="input__wrapper">
        <input
          className='input__field'
          placeholder={children}
          disabled={disabled}
          onChange={handlerChange}
          type={fieldType}
          value={value}
        />

        {type === 'password' &&
          <Button
            color='grey'
            icon={clsx(fieldType === 'password' ? 'rr-eye' : 'rr-eye-crossed')}
            onClick={togglePassword}
            className='input__button'
          />
        }

        {type === 'search' && value &&
          <Button
            color='grey'
            icon='rr-cross-small'
            onClick={() => onChange('')}  
            className='input__button'
          />
        }
      </div>

      {error && <p className="input__message">* {error}</p>}
    </div>
  )
  
}