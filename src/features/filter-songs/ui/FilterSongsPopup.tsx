import { Button } from '@shared/ui/button'
import {
  setActiveCategory,
  setDisactiveCategory,
} from '../model/filterSongsSlice'
import { useAppDispatch } from '@shared/hooks'
import { CategoryCard } from '@entities/category'
import { ICategory } from '@entities/category'
import { Popup } from '@shared/ui/popup'
import { useCategoriesSelector } from '../model/filterSongsSelectors'

export const FilterSongsPopup = () => {
  const dispatch = useAppDispatch()
  const categories = useCategoriesSelector()

  const handlerClick = (category: ICategory) => {
    if (category.active) {
      dispatch(setDisactiveCategory(category.id))
    } else {
      dispatch(setActiveCategory(category.id))
    }
  }

  const categoriesList =
    categories &&
    categories.map(category => (
      <CategoryCard
        key={category.id}
        category={category}
        onClick={handlerClick}
      />
    ))

  const triggerButton = (
    <Button
      className='filter-songs__button'
      color='grey'
      icon='rr-bars-filter'
    />
  )

  return (
    <div className='filter-songs__popup'>
      <Popup trigger={triggerButton}>
        <div className='filter-songs__categories'>
          <p className='filter-songs__title'>Категории</p>
          {categoriesList}
        </div>
      </Popup>
    </div>
  )
}
