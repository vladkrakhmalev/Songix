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

  return (
    <div className={clsx(className, 'input', error && '_error')}>
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
          />
        }

        {type === 'search' && value &&
          <Button
            color='grey'
            icon='rr-cross-small'
            onClick={() => onChange('')}  
          />
        }
      </div>

      {error && <p className="input__message">* {error}</p>}
    </div>
  )
  
}