import { FC } from 'react'
import './Skeleton.scss'

interface IProps {
  variant?: 'primary' | 'secondary'
  width?: string
  height?: string
  radius?: string
  className?: string
}

export const Skeleton: FC<IProps> = ({
  variant = 'primary',
  width = '100%',
  height = '30px',
  radius = '10px',
}) => {
  const styles = { maxWidth: width, height, borderRadius: radius }

  return <div className={`skeleton _${variant}`} style={styles} />
}
