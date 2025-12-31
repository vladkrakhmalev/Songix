import { CollectionList } from '@widgets/collection-list'
import './CollectionsPage.scss'
import { AddCollection } from '@features/add-collection'
import { useTranslation } from 'react-i18next'

function CollectionsPage() {
  const { t } = useTranslation()

  return (
    <div className='collections-page'>
      <div className='collections-page__header'>
        <h1>{t('Collections')}</h1>
        <AddCollection />
      </div>

      <CollectionList />
    </div>
  )
}

export default CollectionsPage
