import './SongPage.scss'
import { useAppSelector } from '@shared/hooks'
import {
  SongContent,
  SongContentEmtpy,
  SongContentSkeleton,
  songApi,
} from '@entities/song'
import { useParams } from 'react-router-dom'
import { ConfigurateList } from '@widgets/configurate-list'
import { EditSongForm, selectIsEditMode } from '@features/edit-song'

function SongPage() {
  const { songId = '', collectionId = '' } = useParams()

  const { speed, textSize } = useAppSelector(state => state.configurateSongs)

  const { data: song, isLoading } = songApi.useGetSongByIdQuery(songId)
  const isEditMode = useAppSelector(selectIsEditMode)

  return (
    <div className='song-page'>
      {isEditMode && <EditSongForm song={song!} />}

      {!isEditMode && isLoading && <SongContentSkeleton />}

      {!isEditMode && !song && !isLoading && <SongContentEmtpy />}

      {!isEditMode && song && !isLoading && (
        <SongContent
          song={song!}
          textSize={textSize}
          speed={speed}
          configurate={
            <ConfigurateList songId={songId} collectionId={collectionId} />
          }
        />
      )}
    </div>
  )
}

export default SongPage
