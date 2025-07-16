import { FC } from 'react'
import './SongList.scss'
import { ISong, songApi, SongCard, SongCardSkeleton } from '@entities/song'
import { LikeSong } from '@features/like-song'
import { useParams } from 'react-router-dom'
import {
  useActiveCategoriesSelector,
  useSearchSelector,
} from '@features/filter-songs'
import { TransitionList } from '@shared/lib/transition'

export const SongList: FC = () => {
  const { collectionId = '' } = useParams()

  const activeCategories = useActiveCategoriesSelector()
  const search = useSearchSelector()
  const { data: songs = [], isLoading } =
    songApi.useGetSongsByCollectionIdQuery(collectionId)

  const filterSongs = songs?.filter((song: ISong) => {
    const categoryMatch =
      !activeCategories.length ||
      activeCategories.some(category =>
        song.categories?.includes(category.name)
      )

    const searchMatch =
      !search || song.title.toLowerCase().includes(search.toLowerCase())

    return categoryMatch && searchMatch
  })

  if (!isLoading && filterSongs.length === 0) {
    return <p className='song-list__not-found'>Ничего не найдено</p>
  }

  return (
    <div className='song-list'>
      <TransitionList
        items={filterSongs}
        isLoading={isLoading}
        className='song-list__items'
        preloadItem={<SongCardSkeleton />}
        renderItem={song => (
          <SongCard song={song} likeSong={<LikeSong song={song} />} />
        )}
        renderKey={song => song.id}
      />
    </div>
  )
}
