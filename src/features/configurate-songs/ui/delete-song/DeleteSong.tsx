import { FC, useState } from 'react';
import './DeleteSong.scss'
import { Popup } from "@shared/ui/popup"
import { Button } from "@shared/ui/button"
import { Notification } from '@shared/ui/notification';
import { ConfigurateItem } from '@features/configurate-songs';
import { useNavigate } from 'react-router-dom';
import { ISong, useDeleteSongMutation } from '@entities/song';


interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  song: ISong
  collectionId?: string
}

export const DeleteSong: FC<IProps> = ({ song, collectionId }) => {

  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const [deleteSong, {isLoading}] = useDeleteSongMutation()
  const navigate = useNavigate()

  const handleDelete = async () => {
    // TODO Сделать удаление песни на беке
    await deleteSong(song.id)
    // TODO Продумать прелоадер во врумя удаления
    setOpenPopup(false)
    setOpenNotification(true)
    // TODO Настроить вывод попапа после удаления
    
    if (collectionId) {
      navigate(`/collections/${collectionId}/songs/`)
    } else {
      navigate(`/collections/`)
    } 
  }

  return (
    <>
      <Popup
        size="full"
        isOpen={openPopup}
        onToggle={open => setOpenPopup(open)}
        trigger={<ConfigurateItem icon='rr-trash' title='Удалить' clickable={true}/>}
      >
        <div className="configurate-list__popup">
          <p className="configurate-list__popup-title">Удалить песню?</p>
          <p className="configurate-list__popup-text">Вы точно хотите удалить песню "{song.title}"?</p>
          <p className="configurate-list__popup-text">Это действие нельзя будет отменить</p>
          <Button size='medium' icon='rr-trash' color='red' onClick={handleDelete}>Удалить</Button>
          <Button size='medium' icon='rr-cross-small' color='light' onClick={() => setOpenPopup(false)}>Отменить</Button>
        </div>
      </Popup>

      <Notification
        isOpen={openNotification}
        onToggle={setOpenNotification}
        icon='rr-trash'
        title='Песня удалена'
      />
    </>
  );
};
