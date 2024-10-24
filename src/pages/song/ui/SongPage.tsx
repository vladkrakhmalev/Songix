import './SongPage.scss'
import clsx from "clsx" 
import { FC, useRef, useState } from "react"
import { useAppSelector } from "@shared/hooks"
import { ScrollSong } from "@features/scroll-song"
import { OpenFullSong } from "@features/open-full-song"
import { Song, useGetSongByIdQuery } from '@entities/song'
import { useParams } from "react-router-dom"
import { ConfigurateList } from "@features/configurate-songs"

export const SongPage: FC = () => {

  const { speed, textSize } = useAppSelector(state => state.configurateSongs)
  const songPageRef = useRef<HTMLDivElement>(null)
  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  const { songId } = useParams()
  const formatSongId = Number(songId)
  const {data: song, isFetching} = useGetSongByIdQuery(formatSongId)

  const actionButtons = (
    <div className="song-page__buttons">
      <ScrollSong speed={speed} scrollRef={songPageRef.current}/>
      <OpenFullSong openRef={songPageRef.current} onChange={value => setIsFullSize(value)}/>
    </div>
  )

  return (
    <div className={clsx("song-page", isFullSize && '_full')} ref={songPageRef}>
      <Song
        textSize={textSize}
        actionButtons={actionButtons}
        song={song}
        isFetching={isFetching}
        configurate={<ConfigurateList/>}
      />
    </div>
  )
}