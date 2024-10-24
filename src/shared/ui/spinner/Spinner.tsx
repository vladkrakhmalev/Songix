import { FC } from 'react'
import './Spinner.scss'

export const Spinner: FC = () => {

  return (
    <div className="spinner">
      <i className="spinner__icon fi fi-br-spinner"/>
    </div>
  )
}