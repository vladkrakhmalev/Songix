import './FilterSongs.scss'
import { FilterSongsPopup } from './FilterSongsPopup'
import { Search } from './Search'
import { FilterSongsTags } from './FilterSongsTags'

export function FilterSongs() {
  return (
    <div className='filter-songs'>
      <FilterSongsPopup />
      <Search />
      <FilterSongsTags />
    </div>
  )
}
