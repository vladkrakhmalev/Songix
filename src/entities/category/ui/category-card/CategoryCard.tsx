import { FC } from "react"
import { ICategory } from "../../model/categoryType"
import clsx from "clsx"
import './CategoryCard.scss'

interface CategoryCardProps {
  category: ICategory
  onClick: (category: ICategory) => void
}

export const CategoryCard: FC<CategoryCardProps> = ({category, onClick}) => {
  
  return (
    <button
      className={clsx("category-card", category.active && '_active')}
      onClick={() => onClick(category)}
    >
      {category.name}
      {category.active && <i className="category-card__icon fi fi-br-cross-small"></i>}  
    </button>
  )
}