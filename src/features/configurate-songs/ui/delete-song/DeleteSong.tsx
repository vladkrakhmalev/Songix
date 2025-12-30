import { useState } from 'react'
import './DeleteSong.scss'
import { Button } from '@shared/ui/button'
import { ConfigurateItem } from '@features/configurate-songs'
import { useNavigate } from 'react-router-dom'
import { ISong, songApi } from '@entities/song'
import { Modal } from '@shared/ui/modal'
import { routes } from '@infra/router'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  song: ISong
  collectionId: string
}

export function DeleteSong({ song, collectionId }: IProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [deleteSong] = songApi.useDeleteSongMutation()
  const navigate = useNavigate()

  async function handleDelete() {
    await deleteSong(song.id)
    setIsOpenModal(false)
    navigate(routes.collection(collectionId))
  }

  return (
    <>
      <ConfigurateItem
        icon='rr-trash'
        title='Удалить'
        clickable={true}
        onClick={() => setIsOpenModal(true)}
      />

      {isOpenModal && (
        <Modal title='Удалить песню?' onClose={() => setIsOpenModal(false)}>
          <div className='configurate-list__popup'>
            <p className='configurate-list__popup-text'>
              Вы точно хотите удалить песню "{song.title}"?
            </p>

            <p className='configurate-list__popup-text'>
              Это действие нельзя будет отменить
            </p>

            <Button icon='trash' variant='danger' onClick={handleDelete}>
              Удалить
            </Button>

            <Button
              icon='cross-small'
              color='light'
              onClick={() => setIsOpenModal(false)}
            >
              Отменить
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
