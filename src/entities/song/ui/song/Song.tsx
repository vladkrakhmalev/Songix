import { FC, ReactNode, useEffect } from 'react';
import './Song.scss'
import { ISong, SongForm } from "@entities/song"
import { Spinner } from "@shared/ui/spinner"
import { ICounterItem } from '@shared/ui/counter';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { toggleEdit } from '@entities/song';

interface ISongProps {
  song: ISong | undefined
  isFetching: boolean
  configurate: ReactNode
  textSize: ICounterItem
  actionButtons: ReactNode
}

export const Song: FC<ISongProps> = ({ song, isFetching, configurate, textSize, actionButtons, }) => {

  const dispatch = useAppDispatch()
  const { isEdit } = useAppSelector(state => state.song)

  useEffect(() => {
    dispatch(toggleEdit(false))
  }, [song])

  if (!song || isFetching) return <Spinner/>

  if (isEdit) return <SongForm song={song}/>

  return (
    <div className="song">
      <div className="song__header">
        <h1 className="song__title">{song.title}</h1>
        {configurate}
      </div>
      <p className="song__text" style={{fontSize: textSize.value + 'px'}}>{song.body}</p>
      
      {actionButtons}
    </div>
  );
};
