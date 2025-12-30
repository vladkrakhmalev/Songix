import { FC } from 'react'
import './SongList.scss'
import { ISong, songApi, SongCard, SongCardSkeleton } from '@entities/song'
import { LikeSong } from '@features/like-song'
import { useParams } from 'react-router-dom'
import {
  useActiveCategoriesSelector,
  useSearchSelector,
} from '@features/filter-songs'

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
      {isLoading && (
        <div className='song-list__items'>
          {Array.from({ length: 5 }, (_, index) => (
            <div key={`preload-${index}`}>
              <SongCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className='song-list__items'>
          {filterSongs.map(song => (
            <div key={song.id}>
              <SongCard song={song} likeSong={<LikeSong song={song} />} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
