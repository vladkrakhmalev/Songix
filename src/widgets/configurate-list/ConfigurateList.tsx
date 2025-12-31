import './ConfigurateList.scss'
import { Counter } from '@shared/ui/counter'
import { Button } from '@shared/ui/button'
import { Popup } from '@shared/ui/popup'
import { useAppDispatch, useAppSelector } from '@shared/hooks'
import {
  ConfigurateItem,
  CopySongLink,
  DeleteSong,
  selectSpeed,
  selectTextSize,
  selectTonality,
} from '@features/configurate-songs'
import {
  SPEED_ARRAY,
  TONALITY_ARRAY,
  TEXT_SIZE_ARRAY,
} from '@features/configurate-songs'
import { setSpeed, setTonality, setTextSize } from '@features/configurate-songs'
import { songApi } from '@entities/song'
import { toggleEditMode } from '@features/edit-song'
import { useTranslation } from 'react-i18next'

interface IProps {
  songId: string
  collectionId: string
}

export function ConfigurateList({ songId, collectionId }: IProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const speed = useAppSelector(selectSpeed)
  const textSize = useAppSelector(selectTextSize)
  const tonality = useAppSelector(selectTonality)

  const { data: song, isFetching } = songApi.useGetSongByIdQuery(songId)

  if (isFetching || !song) return

  return (
    <Popup trigger={<Button icon='settings' />} align='right'>
      <div className='configurate-list'>
        <ConfigurateItem icon='rr-tachometer-fastest' title={t('Speed')}>
          <Counter
            values={SPEED_ARRAY}
            default={speed}
            onChange={item => dispatch(setSpeed(item))}
          />
        </ConfigurateItem>
        <ConfigurateItem icon='rr-music-note' title={t('Tonality')}>
          <Counter
            values={TONALITY_ARRAY}
            default={tonality}
            onChange={item => dispatch(setTonality(item))}
          />
        </ConfigurateItem>
        <ConfigurateItem icon='rr-text-size' title={t('Size')}>
          <Counter
            values={TEXT_SIZE_ARRAY}
            default={textSize}
            onChange={item => dispatch(setTextSize(item))}
          />
        </ConfigurateItem>
        <CopySongLink />
        <ConfigurateItem
          icon='rr-pencil'
          title={t('Edit')}
          onClick={() => dispatch(toggleEditMode())}
        />
        <DeleteSong song={song} collectionId={collectionId} />
      </div>
    </Popup>
  )
}
