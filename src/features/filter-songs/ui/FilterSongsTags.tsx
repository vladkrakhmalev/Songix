import { CategoryCard } from '@entities/category'
import { ICategory } from '@entities/category'
import {
  setActiveCategory,
  setDisactiveCategory,
} from '../model/filterSongsSlice'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { selectActiveCategories } from '../model/filterSongs.selectors'

export function FilterSongsTags() {
  const activeCategories = useAppSelector(selectActiveCategories)
  const dispatch = useAppDispatch()

  function handlerClick(category: ICategory) {
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
