import './SongNewPage.scss'
import { SongForm } from '@entities/song';

export const SongNewPage= () => {

  return (
    <SongForm isNew={true}/>
  );
};
