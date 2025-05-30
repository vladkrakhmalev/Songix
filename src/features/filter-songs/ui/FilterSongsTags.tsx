import { FC } from 'react'
import { CategoryCard } from '@entities/category'
import { ICategory } from '@entities/category'
import {
  setActiveCategory,
  setDisactiveCategory,
} from '../model/filterSongsSlice'
import { useAppDispatch } from '@shared/hooks'
import { useActiveCategoriesSelector } from '../model/filterSongsSelectors'

export const FilterSongsTags: FC = () => {
  const activeCategories = useActiveCategoriesSelector()
  const dispatch = useAppDispatch()

  const handlerClick = (category: ICategory) => {
    if (category.active) {
      dispatch(setDisactiveCategory(category.id))
    } else {
      dispatch(setActiveCategory(category.id))
    }
  }

  if (!activeCategories.length) return

  return (
    <div className='filter-songs__tags'>
      {activeCategories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={handlerClick}
        />
      ))}
    </div>
  )
}
