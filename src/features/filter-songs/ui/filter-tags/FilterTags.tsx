import { FC } from 'react'
import { CategoryCard } from '@entities/category'
import { ICategory } from '@entities/category'
import { setActiveCategory, setDisactiveCategory } from '../../model/filterSongsSlice'
import { useAppDispatch } from '@shared/hooks'
import './FilterTags.scss'
import clsx from 'clsx'

interface FilterTagsProps {
  categories: ICategory[]
  className: string
}

export const FilterTags: FC<FilterTagsProps> = ({ categories, className }) => {
  const dispatch = useAppDispatch()

  const handlerClick = (category: ICategory) => {
    if (category.active) {
      dispatch(setDisactiveCategory(category.id))
    } else {
      dispatch(setActiveCategory(category.id))
    }
  }

  if (!categories.length) return

  return (
    <div className={clsx('filter-tags', className)}>
      {categories.map(category =>
        <CategoryCard
          key={category.id}
          category={category}
          onClick={handlerClick}
        />
      )}
    </div>
  )
}