import { Button } from '@shared/ui/button'
import './Filter.scss'
import { setActiveCategory, setDisactiveCategory } from '../../model/filterSongsSlice'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import { CategoryCard } from '@entities/category'
import { ICategory } from '@entities/category'
import { Popup } from '@shared/ui/popup'

export const Filter = () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(state => state.filterSongs)

  const handlerClick = (category: ICategory) => {
    if (category.active) {
      dispatch(setDisactiveCategory(category.id))
    } else {
      dispatch(setActiveCategory(category.id))
    }
  }

  const categoriesList = categories && categories.map(category => 
    <CategoryCard
      key={category.id}
      category={category}
      onClick={handlerClick}
    />
  )

  const triggerButton = (
    <Button
      className='filter-songs__button'
      color='grey'
      icon='rr-bars-filter'
    />
  )

  return (
    <div className="filter-songs">
      <Popup trigger={triggerButton}>
        <div className="filter-songs__categories">
          <p className="filter-songs__title">Категории</p>
          {categoriesList}
        </div>
      </Popup>
    </div>
  )
}