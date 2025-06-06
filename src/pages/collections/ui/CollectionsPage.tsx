import { CollectionList } from '@widgets/collection-list'
import './CollectionsPage.scss'

export const CollectionsPage = () => {
  return (
    <>
      <div className='collections-page__header'>
        <h1>Сборники</h1>
      </div>

      <CollectionList />
    </>
  )
}
