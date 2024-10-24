import { useParams } from 'react-router-dom'
import { SongList } from '@entities/song'
import { Filter, FilterTags, Search } from '@features/filter-songs'
import './CollectionSidebar.scss'
import { Button } from '@shared/ui/button'
import { useGetSongsByCollectionIdQuery } from '@entities/song'
import { useAppSelector } from '@shared/hooks'
import { ISong } from "@entities/song";
import { CollectionSelect } from '@entities/collection'
import { LayoutMainTrigger } from '@features/toggle-layout'

export const CollectionSidebar = () => {

  const { categories, search } = useAppSelector(state => state.filterSongs)

  const { collectionId } = useParams()
  const formatCollectionId = Number(collectionId)

  const { data: response, isFetching } = useGetSongsByCollectionIdQuery(formatCollectionId)
  const songs = response && response.posts

  const activeCategories = categories.filter(category => category.active)

  const filterSongs = songs?.filter((song: ISong) => {
    const categoryMatch = !activeCategories.length || categories.some(category => song.tags.includes(category.name))
    const searchMatch = !search || song.title.toLowerCase().includes(search.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className='collection-sidebar'>
      <div className="collection-sidebar__header">
        <Button color='grey' icon='rr-home' to='/'/>
        <CollectionSelect/>
        <LayoutMainTrigger/>
      </div>
      
      <div className="collection-sidebar__filters">
        <Filter/>
        <Search/>
        <FilterTags
          className='collection-sidebar__tags'
          categories={activeCategories}
        />
      </div>

      <SongList
        songs={filterSongs}
        collectionId={collectionId}
        isFetching={isFetching}
      />
      <Button
        color='light'
        to={`/collections/${collectionId}/songs/new`}
        icon=''
      >Добавить</Button>
    </div>
  )
}