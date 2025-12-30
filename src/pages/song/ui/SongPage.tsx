import './SongPage.scss'
import clsx from 'clsx'
import { FC, useRef, useState } from 'react'
import { useAppSelector } from '@shared/hooks'
import { ScrollSong } from '@features/scroll-song'
import { OpenFullSong } from '@features/open-full-song'
import {
  SongContent,
  SongContentEmtpy,
  SongContentSkeleton,
  songApi,
} from '@entities/song'
import { useParams } from 'react-router-dom'
import { ConfigurateList } from '@widgets/configurate-list'
import { EditSongForm, useIsEditModeSelector } from '@features/edit-song'

export const SongPage: FC = () => {
  const { speed, textSize } = useAppSelector(state => state.configurateSongs)
  const songPageRef = useRef<HTMLDivElement>(null)
  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  const { songId = '' } = useParams()
  const { data: song, isLoading } = songApi.useGetSongByIdQuery(songId)
  const isEditMode = useIsEditModeSelector()

  const actionButtons = (
    <div className='song-page__buttons'>
      <ScrollSong speed={speed} scrollRef={songPageRef.current} />
      <OpenFullSong
        openRef={songPageRef.current}
        onChange={value => setIsFullSize(value)}
      />
    </div>
  )

  return (
    <div className={clsx('song-page', isFullSize && '_full')} ref={songPageRef}>
      {isEditMode && <EditSongForm song={song!} />}

      {!isEditMode && (
        <>
          {isLoading && <SongContentSkeleton />}

          {!song && !isLoading && <SongContentEmtpy />}

          {!!song && !isLoading && (
            <SongContent
              song={song!}
              textSize={textSize}
              configurate={<ConfigurateList />}
              actionButtons={actionButtons}
            />
          )}
        </>
      )}
    </div>
  )
}
