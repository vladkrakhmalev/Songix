import { FC } from 'react'
import './SongList.scss'
import { ISong, songApi, SongCard, SongCardSkeleton } from '@entities/song'
import { LikeSong } from '@features/like-song'
import { useParams } from 'react-router-dom'
import {
  useActiveCategoriesSelector,
  useSearchSelector,
} from '@features/filter-songs'
import { SKELETON_ARRAY } from '@shared/ui/skeleton'

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

  if (isLoading) {
    return (
      <div className='song-list'>
        {SKELETON_ARRAY.map(skeleton => (
          <SongCardSkeleton key={skeleton} />
        ))}
      </div>
    )
  }

  if (!filterSongs.length) {
    return <p className='message'>Ничего не найдено</p>
  }

  return (
    <div className='song-list'>
      {filterSongs.map(song => (
        <SongCard
          key={song.id}
          song={song}
          likeSong={<LikeSong song={song} />}
        />
      ))}
    </div>
  )
}
