import { ReactNode } from 'react'
import './CollectionCard.scss'
import { ICollection } from '../../model/collectionType'
import { useNavigate } from 'react-router-dom'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'

interface IProps {
  collection: ICollection
  deleteCollection: ReactNode
  editCollection: ReactNode
}

export function CollectionCard({
  collection,
  deleteCollection,
  editCollection,
}: IProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  function handleRedirect() {
    if (collection) {
      navigate(routes.collection(collection.id))
    }
  }

  return (
    <div onClick={handleRedirect} className='collection-card'>
      <div className='collection-card__header'>
        {editCollection}
        {deleteCollection}
      </div>
      <p className='collection-card__count'>
        {t('Songs: {{value}}', { value: collection.songsCount })}
      </p>
    </div>
  )
}
