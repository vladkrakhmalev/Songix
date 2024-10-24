import { FC, useEffect, useRef, useState } from 'react';
import './Select.scss'
import { useOutsideClick } from '@shared/hooks';
import clsx from 'clsx';

interface ISelect {
  items: string[]
  value?: string
  values?: string[]
  placeholder?: string
  multiselect?: boolean
  className?: string
  onChange: (value: string[] | string) => void
}

export const Select: FC<ISelect> = (props) => {
  const {
    items = [],
    value ='',
    values = [],
    placeholder = 'Поиск',
    multiselect = false,
    className,
    onChange,
  } = props

  const [activeItem, setActiveItem] = useState<string>(value)
  const [activeItems, setActiveItems] = useState<string[]>(values)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const selectRef = useOutsideClick(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    if (multiselect) {
      onChange(activeItems)
    } else {
      onChange(activeItem)
    }
  }, [activeItem, activeItems])


  const deleteItem = (currentItem: string) => {
    setActiveItems(prevValue => {
      return prevValue.filter(item => item !== currentItem)
    })
  }

  const addItem = (item: string) => {
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
    if (multiselect) setActiveItem('')
    setSearch('')
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      setIsOpen(true)
    }
  }

  const filtredItems = items.filter(item => item.includes(search))

  const iconClass = clsx(
    'select__icon fi',
    !search && !isOpen && 'fi-rr-angle-small-down',
    !search && isOpen && 'fi-rr-angle-small-up',
    search && 'fi-rr-cross-small',
  )

  return (
    <div className={clsx("select", className)} ref={selectRef}>
      <div className="select__field" onClick={focusInput}>
        {activeItems.length > 0 && multiselect && <div className="select__tags">
          {activeItems.map(item =>
            <div
              key={item}
              className="select__tag"
              onClick={() => deleteItem(item)}
            >
              {item}
              <i className='select__tag-icon fi fi-rr-cross-small'></i>
            </div>
          )}
        </div>}
        <div className="select__field-wrapper">
          <input
            type="text"
            className="select__input"
            value={search}
            onChange={event => setSearch(event.target.value)}
            ref={inputRef}
            placeholder={placeholder}
          />
          <i className={iconClass} onClick={handleClear}></i>
        </div>
      </div>
      <div className={clsx("select__container", isOpen && '_open')}>
        {filtredItems.map(item =>
          <div
            key={item}
            className="select__item"
            onClick={() => addItem(item)}
          >
            {item}
          </div>
        )}
      </div>
    </div>
  );
};
