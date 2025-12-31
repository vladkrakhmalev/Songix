import './SongList.scss'
import { ISong, songApi, SongCard, SongCardSkeleton } from '@entities/song'
import { LikeSong } from '@features/like-song'
import { useParams } from 'react-router-dom'
import { selectActiveCategories, selectSearch } from '@features/filter-songs'
import { SKELETON_ARRAY } from '@shared/ui/skeleton'
import { useAppSelector } from '@shared/hooks'
import { useTranslation } from 'react-i18next'

export function SongList() {
  const { t } = useTranslation()
  const { collectionId = '' } = useParams()

  const activeCategories = useAppSelector(selectActiveCategories)
  const search = useAppSelector(selectSearch)
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
    return <p className='message'>{t('Nothing found')}</p>
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
