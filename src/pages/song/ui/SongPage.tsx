import './SongPage.scss'
import clsx from 'clsx'
import { FC, useRef, useState } from 'react'
import { useAppSelector } from '@shared/hooks'
import { ScrollSong } from '@features/scroll-song'
import { OpenFullSong } from '@features/open-full-song'
import { SongContent, songApi } from '@entities/song'
import { useParams } from 'react-router-dom'
import { ConfigurateList } from '@widgets/configurate-list'
import { EditSongForm, useIsEditModeSelector } from '@features/edit-song'

export const SongPage: FC = () => {
  const { speed, textSize } = useAppSelector(state => state.configurateSongs)
  const songPageRef = useRef<HTMLDivElement>(null)
  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  const { songId = '' } = useParams()
  const { data: song, isFetching } = songApi.useGetSongByIdQuery(songId)
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

  // TODO Добавить красивую обработку
  if (!song) return 'Песня не загрузилась'

  return (
    <div className={clsx('song-page', isFullSize && '_full')} ref={songPageRef}>
      {isEditMode && <EditSongForm song={song} />}

      {!isEditMode && (
        <SongContent
          textSize={textSize}
          actionButtons={actionButtons}
          song={song}
          isFetching={isFetching}
          configurate={<ConfigurateList />}
        />
      )}
    </div>
  )
}
