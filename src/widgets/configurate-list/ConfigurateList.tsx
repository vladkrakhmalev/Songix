import { FC, useState } from 'react';
import './ConfigurateList.scss'
import { Counter } from '@shared/ui/counter'
import { Button } from "@shared/ui/button"
import { Popup } from "@shared/ui/popup"
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { ConfigurateItem } from '@features/configurate-songs';
import { SPEED_ARRAY, TONALITY_ARRAY, TEXT_SIZE_ARRAY } from '@features/configurate-songs';
import { setSpeed, setTonality, setTextSize } from '@features/configurate-songs';
import { toggleEdit, useGetSongByIdQuery } from '@entities/song';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDeleteSongMutation } from '@entities/song';
import { Notification } from '@shared/ui/notification';

export const ConfigurateList: FC = () => {

  const dispatch = useAppDispatch()
  const { speed, tonality, textSize } = useAppSelector(state => state.configurateSongs)
  const { songId, collectionId } = useParams()
  const formatSongId = Number(songId)
  const {data: song, isFetching} = useGetSongByIdQuery(formatSongId)
  const [deleteSong, {isLoading}] = useDeleteSongMutation()
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>('')
  const location = useLocation();

  const handleCopy = () => {
    const currentUrl = window.location.origin + location.pathname;
    navigator.clipboard.writeText(currentUrl)
    setStatus('copied')
  }

  const handleDelete = async () => {
    await deleteSong(formatSongId)
    setStatus('deleted')
    // navigate(`/collections/${collectionId}/songs/`)
  }

  if (isFetching) return

  const deletePopup = (
    <div className="configurate-list__popup">
      <p className="configurate-list__popup-title">Удалить песню?</p>
      <p className="configurate-list__popup-text">Вы точно хотите удалить песню "{song?.title}"?</p>
      <p className="configurate-list__popup-text">Это действие нельзя будет отменить</p>
      <Button icon='rr-trash' color='red' onClick={handleDelete}>Удалить</Button>
      <Button icon='rr-cross-small' color='light'>Отменить</Button>
    </div>
  )

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
        <ConfigurateItem icon='rr-share' title='Поделиться' onClick={handleCopy}/>
        <ConfigurateItem icon='rr-pencil' title='Редактировать' onClick={() => dispatch(toggleEdit())}/>
        <Popup size="full" trigger={<ConfigurateItem icon='rr-trash' title='Удалить' clickable={true}/>}>
          {deletePopup}
        </Popup>
      </div>

      <Notification isOpen={status == 'copied'} icon='rr-clone' title='Ссылка скопирована'/>
    </Popup>
  );
};
