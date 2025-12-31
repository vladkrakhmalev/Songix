import { useState } from 'react'
import './DeleteSong.scss'
import { Button } from '@shared/ui/button'
import { ConfigurateItem } from '@features/configurate-songs'
import { useNavigate } from 'react-router-dom'
import { ISong, songApi } from '@entities/song'
import { Modal } from '@shared/ui/modal'
import { routes } from '@infra/router'
import { useTranslation } from 'react-i18next'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  song: ISong
  collectionId: string
}

export function DeleteSong({ song, collectionId }: IProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [deleteSong] = songApi.useDeleteSongMutation()

  async function handleDelete() {
    await deleteSong(song.id)
    setIsOpenModal(false)
    navigate(routes.collection(collectionId))
  }

  return (
    <>
      <ConfigurateItem
        icon='rr-trash'
        title={t('Remove')}
        clickable={true}
        onClick={() => setIsOpenModal(true)}
      />

      {isOpenModal && (
        <Modal title={t('Remove song')} onClose={() => setIsOpenModal(false)}>
          <div className='configurate-list__popup'>
            <p className='configurate-list__popup-text'>
              {t('Are you sure you want to delete the song "{{title}}"?', {
                title: song.title,
              })}
            </p>

            <p className='configurate-list__popup-text'>
              {t('This action cannot be undone')}
            </p>

            <Button icon='trash' variant='danger' onClick={handleDelete}>
              {t('Remove')}
            </Button>

            <Button
              icon='cross-small'
              color='light'
              onClick={() => setIsOpenModal(false)}
            >
              {t('Cancel')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
