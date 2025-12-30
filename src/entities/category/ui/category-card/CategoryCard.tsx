import { ICategory } from '../../model/categoryType'
import clsx from 'clsx'
import './CategoryCard.scss'
import { Icon } from '@shared/ui/icon'

interface CategoryCardProps {
  category: ICategory
  onClick: (category: ICategory) => void
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      className={clsx('category-card', category.active && '_active')}
      onClick={() => onClick(category)}
    >
      {category.name}
      {category.active && <Icon name='cross-small' />}
    </button>
  )
}
