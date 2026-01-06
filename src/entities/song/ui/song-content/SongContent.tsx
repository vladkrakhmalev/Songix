import { ReactNode, useState } from 'react'
import './SongContent.scss'
import { ISong } from '@entities/song'
import { ICounterItem } from '@shared/ui/counter'
import { BackButton } from '@infra/router'
import { OpenFullElement, ScrollElement } from '@infra/dom'
import clsx from 'clsx'
import { routes } from '@infra/router'
import { sanitize } from '@shared/utils/sanitize'
import { Textarea } from '@shared/ui/textarea'

interface ISongProps {
  song: ISong
  speed: ICounterItem
  textSize: ICounterItem
  configurate: ReactNode
}

export function SongContent({
  song,
  configurate,
  speed,
  textSize,
}: ISongProps) {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  return (
    <div
      ref={setContainerEl}
      className={clsx('song-content', isFullSize && '_full')}
    >
      {!isFullSize && (
        <div className='song-content__header'>
          <BackButton to={routes.collection(String(song.collectionId))} />

          <h1 className='song-content__title'>{song?.title}</h1>

          {configurate}
        </div>
      )}

      <Textarea
        value={sanitize(song?.text)}
        style={{ fontSize: textSize.value + 'px' }}
        readonly
      />

      <div className='song-content__buttons'>
        <ScrollElement element={containerEl} speed={speed} />
        <OpenFullElement
          element={containerEl}
          onChange={isOpen => setIsFullSize(isOpen)}
        />
      </div>
    </div>
  )
}
