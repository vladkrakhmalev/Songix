import { CollectionList } from '@widgets/collection-list'
import './CollectionsPage.scss'
import { AddCollection } from '@features/add-collection'

function CollectionsPage() {
  return (
    <div className='collections-page'>
      <div className='collections-page__header'>
        <h1>Сборники</h1>
        <AddCollection />
      </div>

      <CollectionList />
    </div>
  )
}

export default CollectionsPage
