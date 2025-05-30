import { useEffect, useRef, useState } from 'react'
import './Select.scss'
import { useOutsideClick } from '@shared/hooks'
import clsx from 'clsx'

interface ISelect<T extends string> {
  items: T[]
  value?: T
  values?: T[]
  placeholder?: string
  multiselect?: boolean
  className?: string
  onChange: (value?: T[] | T) => void
}

export const Select = <T extends string>(props: ISelect<T>) => {
  const {
    items = [],
    value,
    values = [],
    placeholder = 'Поиск',
    multiselect = false,
    className,
    onChange,
  } = props

  const [activeItem, setActiveItem] = useState<T | undefined>(value)
  const [activeItems, setActiveItems] = useState<T[]>(values)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const selectRef = useOutsideClick(() => {
    setIsOpen(false)
  })

  const deleteItem = (currentItem: string) => {
    setActiveItems(prevValue => {
      return prevValue.filter(item => item !== currentItem)
    })
  }

  const addItem = (item: T) => {
    if (multiselect) {
      setActiveItems(prevValue => {
        if (!prevValue.includes(item)) {
          return [...prevValue, item]
        }
        return prevValue
      })
    } else {
      setActiveItem(item)
      setSearch(item)
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    if (multiselect) setActiveItem(undefined)
    setSearch('')
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      setIsOpen(true)
    }
  }

  useEffect(() => {
    setActiveItem(activeItem)
  }, [activeItem])

  useEffect(() => {
    setActiveItems(activeItems)
  }, [activeItems])

  useEffect(() => {
    if (multiselect) {
      onChange(activeItems)
    } else {
      onChange(activeItem)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem, activeItems])

  const filtredItems = items.filter(item => item.includes(search))

  const iconClass = clsx(
    'select__icon fi',
    !search && !isOpen && 'fi-rr-angle-small-down',
    !search && isOpen && 'fi-rr-angle-small-up',
    search && 'fi-rr-cross-small'
  )

  return (
    <div className={clsx('select', className)} ref={selectRef}>
      <div className='select__field' onClick={focusInput}>
        {activeItems.length > 0 && multiselect && (
          <div className='select__tags'>
            {activeItems.map(item => (
              <div
                key={item}
                className='select__tag'
                onClick={() => deleteItem(item)}
              >
                {item}
                <i className='select__tag-icon fi fi-rr-cross-small'></i>
              </div>
            ))}
          </div>
        )}
        <div className='select__field-wrapper'>
          <input
            type='text'
            className='select__input'
            value={search}
            onChange={event => setSearch(event.target.value)}
            ref={inputRef}
            placeholder={placeholder}
          />
          <i className={iconClass} onClick={handleClear}></i>
        </div>
      </div>
      <div className={clsx('select__container', isOpen && '_open')}>
        {filtredItems.map(item => (
          <div
            key={item}
            className='select__item'
            onClick={() => addItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
