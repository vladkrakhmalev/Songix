import { CollectionList } from "@widgets/collection-list"
import './CollectionsPage.scss'
import { LayoutMainTrigger } from "@features/toggle-layout"
import { isMobail } from "@shared/utils/is-mobail"

export const CollectionsPage = () => {

  return (
    <>
      <div className="collections-page__header">
        {isMobail() && <LayoutMainTrigger/>}
        <h1>Сборники</h1>
      </div>

      <CollectionList/>
    </>
  )
}