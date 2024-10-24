import { FC, useState } from 'react';
import './ScrollSong.scss'
import { Button } from "@shared/ui/button"
import type { ICounterItem } from "@shared/ui/counter"

interface IScrollSong {
  speed: ICounterItem,
  scrollRef: HTMLDivElement | null,
}

export const ScrollSong: FC<IScrollSong> = ({speed, scrollRef}) => {

  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [scroll, setScroll] = useState<any>()

  const toggleScroll = () => {
    if (!isScrolling && scrollRef) {
      setScroll(setInterval(() => {
        scrollRef.scrollBy({ top: Number(speed.value), behavior: "smooth" })
      }, 1))

    } else clearInterval(scroll)
    setIsScrolling(!isScrolling)
  }

  return (
    <Button 
      className="song-page__button"
      color={isScrolling ? null : 'grey'}
      icon="br-chevron-double-down"
      onClick={toggleScroll}
    />
  );
};
