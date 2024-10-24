import { FC } from 'react'
import './SongList.scss'
import { ISong, SongCard } from '@entities/song'
import clsx from 'clsx'

interface SongListProps {
  collectionId: string
  songs: ISong[]
  isFetching: boolean
}

export const SongList: FC<SongListProps> = ({songs = [], collectionId, isFetching}) => {
  
  const preloaderArray = [0,1,2,3,4]
  const isNotFound = !isFetching && !songs?.length

  if (isNotFound) return (
    <p className="song-list__not-found">Ничего не найдено</p>
  )

  return (
    <div className='song-list'>
      <div className={clsx("song-list__preloader", isFetching && '_visible')}>
        {preloaderArray.map(id => 
          <SongCard key={id}/>
        )}
      </div>

      {songs && <div className={clsx("song-list__content", !isFetching && '_visible')}>
        {songs.map(song => 
          <SongCard key={song.id} song={song} collectionId={collectionId}/>
        )}
      </div>}
    </div>
  )
}