import { FC, useState } from 'react';
import './OpenFullSong.scss'
import { Button } from "@shared/ui/button"

interface IOpenFullSong {
  openRef: HTMLDivElement | null,
  onChange: (isFullSize: boolean) => void
}

export const OpenFullSong: FC<IOpenFullSong> = ({ openRef, onChange }) => {

  const [isFullSize, setIsFullSize] = useState<boolean>(false)

  const toggleFullScreen = () => {
    if (!isFullSize && openRef?.requestFullscreen) {
      openRef.requestFullscreen()

    } else if (openRef && document.fullscreenElement) {
      document.exitFullscreen()
    }

    setIsFullSize(!isFullSize)
    onChange(!isFullSize)
  }

  return (
    <Button
      className="song-page__button"
      color={isFullSize ? null : 'grey'}
      icon={isFullSize ? 'br-compress' : 'br-expand'}
      onClick={toggleFullScreen}
    />
  );
};
