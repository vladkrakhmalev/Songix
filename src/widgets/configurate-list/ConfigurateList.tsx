import { FC } from 'react';
import './ConfigurateList.scss'
import { Counter } from '@shared/ui/counter'
import { Button } from "@shared/ui/button"
import { Popup } from "@shared/ui/popup"
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { ConfigurateItem, CopySongLink, DeleteSong } from '@features/configurate-songs';
import { SPEED_ARRAY, TONALITY_ARRAY, TEXT_SIZE_ARRAY } from '@features/configurate-songs';
import { setSpeed, setTonality, setTextSize } from '@features/configurate-songs';
import { toggleEdit, useGetSongByIdQuery } from '@entities/song';
import { useParams } from 'react-router-dom';

export const ConfigurateList: FC = () => {

  const dispatch = useAppDispatch()
  const { speed, tonality, textSize } = useAppSelector(state => state.configurateSongs)
  const { songId, collectionId } = useParams()
  const formatSongId = Number(songId)
  const {data: song, isFetching} = useGetSongByIdQuery(formatSongId)

  if (isFetching || !song) return

  return (
    <Popup trigger={<Button color="grey" icon="rr-settings"/>} align='right'>
      <div className="configurate-list">
        <ConfigurateItem icon='rr-tachometer-fastest' title='Скорость'>
          <Counter values={SPEED_ARRAY} default={speed} onChange={item => dispatch(setSpeed(item))}/>
        </ConfigurateItem>
        <ConfigurateItem icon='rr-music-note' title='Тональность'>
          <Counter values={TONALITY_ARRAY} default={tonality} onChange={item => dispatch(setTonality(item))}/>
        </ConfigurateItem>
        <ConfigurateItem icon='rr-text-size' title='Размер'>
          <Counter values={TEXT_SIZE_ARRAY} default={textSize} onChange={item => dispatch(setTextSize(item))}/>
        </ConfigurateItem>
        <CopySongLink/>
        <ConfigurateItem icon='rr-pencil' title='Редактировать' onClick={() => dispatch(toggleEdit())}/>
        <DeleteSong song={song} collectionId={collectionId}/>
      </div>
    </Popup>
  );
};
