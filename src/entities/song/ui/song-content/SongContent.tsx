import { FC, ReactNode, useRef, useState } from 'react'
import './SongContent.scss'
import { ISong } from '@entities/song'
import { ICounterItem } from '@shared/ui/counter'
import { BackButton } from '@infra/history'
import { OpenFullElement, ScrollElement } from '@infra/dom'
import clsx from 'clsx'

interface ISongProps {
  song: ISong
  speed: ICounterItem
  textSize: ICounterItem
  configurate: ReactNode
}

export const SongContent: FC<ISongProps> = ({
  song,
  configurate,
  speed,
  textSize,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  return (
    <div className='song-content'>
      <div className='song-content__header'>
        <BackButton />

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
