import { FC } from 'react';
import './SongCard.scss'
import { useNavigate } from 'react-router-dom'
import type { ISong } from '@entities/song';
import { useAppDispatch } from '@shared/hooks';
import { toggleHidden } from '@features/toggle-layout';
import { isMobail } from '@shared/utils/is-mobail';

interface ISongCard {
  song?: ISong
  collectionId?: string
}

export const SongCard: FC<ISongCard> = ({ song, collectionId, }) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRedirect = () => {
    if (song && collectionId) {
      const link = `/collections/${collectionId}/songs/${song.id}`
      navigate(link)
      if (isMobail()) dispatch(toggleHidden())
    }
  }

  if (!song) return <div className='song-card _load'></div>

  return (
    <div className='song-card' key={song.id}>
      <div onClick={handleRedirect} className="song-card__link">{song.title}</div>
      <i className="song-card__favorite fi fi-sr-heart"></i>
    </div>
  );
};
