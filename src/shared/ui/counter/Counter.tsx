import { FC, useState } from 'react'
import { Button } from '../button'
import './Counter.scss'
import { ICounterItem } from './Counter.type'

interface ICounter {
  values: ICounterItem[]
  default?: ICounterItem
  onChange: (selectedValue: ICounterItem) => void
}

export const Counter: FC<ICounter> = ({values, default: defaultValue = values[0], onChange}) => {

  const [active, setActive] = useState<ICounterItem>(defaultValue)

  const selectPrev = () => {
    const idx = values.findIndex(item => item.value === active.value)

    if (idx != -1) {
      const newIdx = idx === 0 ? values.length - 1 : idx - 1
      setActive(values[newIdx])
      onChange(values[newIdx])
    }
  }

  const selectNext = () => {
    const idx = values.findIndex(item => item.value === active.value)

    if (idx != -1) {
      const newIdx = idx === values.length - 1 ? 0 : idx + 1
      setActive(values[newIdx])
      onChange(values[newIdx])
    }
  }
  
  return (
    <div className="counter">
      <Button size='small' color='light' onClick={selectPrev}>-</Button>
      <span className="counter__value">{active.title}</span>
      <Button size='small' color='light' onClick={selectNext}>+</Button>
    </div>
  )
}