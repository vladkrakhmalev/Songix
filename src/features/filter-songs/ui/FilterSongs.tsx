import { FC } from 'react'
import './FilterSongs.scss'
import { FilterSongsPopup } from './FilterSongsPopup'
import { Search } from './Search'
import { FilterSongsTags } from './FilterSongsTags'

export const FilterSongs: FC = () => {
  return (
    <div className='filter-songs'>
      <FilterSongsPopup />
      <Search />
      <FilterSongsTags />
    </div>
  )
}
