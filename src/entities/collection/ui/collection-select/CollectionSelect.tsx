import { FC } from "react";
import './CollectionSelect.scss'
import { collectionApi } from '../../api/collectionApi'
import { useNavigate, useParams } from "react-router-dom";
import { Popup } from "@shared/ui/popup";

export const CollectionSelect: FC = () => {
  const navigate = useNavigate()
  const { collectionId } = useParams()
  const formatCollectionId = Number(collectionId)

  const { data: response, isLoading } = collectionApi.useGetCollectionsQuery(0)
  const collections = response ? response.users : []
  const aciveCollection = collections.find(collection => collection.id == formatCollectionId)

  const handlerClick = (id: number) => {
    navigate(`/collections/${id}/songs`)
  }

  if (isLoading) return (
    <div className="collection-select _load"></div>
  )

  const trigger = (
    <div className="collection-select__field">
      <p className="collection-select__field-title">{aciveCollection?.firstName || "Выберите сборник"}</p>
      <i className="collection-select__field-icon fi fi-rr-caret-down"></i>
    </div>
  )

  const collectionList = (
    <div className="collection-select__list">
      {collections.map(collection => 
        <div
          key={collection.id}
          className="collection-select__link"
          onClick={() => handlerClick(collection.id)}
        >{collection.firstName}</div>
      )}
    </div>
  )

  return (
    <div className="collection-select">
      <Popup trigger={trigger} align="center">
        {collectionList}
      </Popup>
    </div>
  )
}