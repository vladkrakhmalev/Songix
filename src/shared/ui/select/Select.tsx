import { useState, useMemo, useEffect, ChangeEvent } from 'react'
import './Select.scss'
import { Transition } from '@shared/lib/transition'
import clsx from 'clsx'
import { useOutsideClick } from '@shared/hooks'

export interface ISelectOption<T extends string> {
  label: string
  value: T
}

interface IProps<T extends string> {
  options: ISelectOption<T>[]
  value: T
  disabled?: boolean
  isSearchable?: boolean
  placeholder?: string
  optionsTitle?: string
  onChange: (value: T) => void
}

export const Select = <T extends string>({
  options,
  value,
  disabled,
  isSearchable,
  placeholder,
  optionsTitle,
  onChange,
}: IProps<T>) => {
  const initialValue = value
    ? options.find(opt => opt.value === value)?.label
    : ''

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(initialValue)

  const selectRef = useOutsideClick(() => setIsOpen(false))

  const handleOpen = () => {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  const handleSelect = (newValue: T) => {
    onChange(newValue)
    setIsOpen(false)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value.trim()
    setSearch(newSearch)
    if (!isOpen) setIsOpen(true)
  }

  const filteredOptions = useMemo(() => {
    if (!isSearchable || !search) return options

    return options.filter(opt =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, options, isSearchable])

  const selectFieldClass = clsx(
    'select__field',
    isOpen && '_open',
    disabled && '_disabled'
  )

  const selectIconClass = clsx(
    'select__icon fi',
    isOpen ? 'fi-rr-angle-small-up' : 'fi fi-rr-angle-small-down'
  )

  useEffect(() => {
    setSearch(initialValue)
  }, [initialValue])

  return (
    <div className='select' ref={selectRef}>
      <div className={selectFieldClass} onClick={handleOpen}>
        <input
          value={search}
          readOnly={!isSearchable}
          disabled={disabled}
          placeholder={placeholder}
          type='text'
          className='select__input'
          onChange={handleSearch}
        />

        <i className={selectIconClass}></i>
      </div>

      <Transition in={isOpen}>
        <div className='select__options'>
          {optionsTitle && (
            <div className='select__options-title'>{optionsTitle}</div>
          )}

          {filteredOptions.map(option => (
            <div
              key={option.value}
              className={clsx(
                'select__options-item',
                option.value === value && '_selected'
              )}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div className='select__options-message'>Список пуст</div>
          )}
        </div>
      </Transition>
    </div>
  )
}
