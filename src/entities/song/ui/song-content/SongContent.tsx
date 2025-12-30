import { ReactNode, useRef, useState } from 'react'
import './SongContent.scss'
import { ISong } from '@entities/song'
import { ICounterItem } from '@shared/ui/counter'
import { BackButton } from '@infra/router'
import { OpenFullElement, ScrollElement } from '@infra/dom'
import clsx from 'clsx'
import { routes } from '@infra/router'

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
  const ref = useRef<HTMLDivElement>(null)

  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  return (
    <div className='song-content'>
      <div className='song-content__header'>
        <BackButton to={routes.collection(String(song.collectionId))} />

        <h1 className='song-content__title'>{song?.title}</h1>

        {configurate}
      </div>

      <div
        ref={ref}
        className={clsx('song-content__body', isFullSize && '_full')}
      >
        <p
          className='song-content__text'
          style={{ fontSize: textSize.value + 'px' }}
        >
          {song?.text}
        </p>

        <div className='song-content__buttons'>
          <ScrollElement element={ref.current} speed={speed} />
          <OpenFullElement
            element={ref.current}
            onChange={isOpen => setIsFullSize(isOpen)}
          />
        </div>
      </div>
    </div>
  )
}
