import { FC } from 'react';
import './SongCard.scss'
import { Link } from 'react-router-dom'
import type { ISong } from '@entities/song';

interface ISongCard {
  song?: ISong
  collectionId?: string
}

export const SongCard: FC<ISongCard> = ({ song, collectionId, }) => {

  const songLink = (song: ISong) => (`/collections/${collectionId}/songs/${song.id}`)

  if (!song) return <div className='song-card _load'></div>

  return (
    <div className='song-card' key={song.id}>
      <Link
        to={songLink(song)}
        className="song-card__link"
      >{song.title}</Link>

      <i className="song-card__favorite fi fi-sr-heart"></i>
    </div>
  );
};
