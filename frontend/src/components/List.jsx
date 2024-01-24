import { Link } from "react-router-dom"
import { sendRequest } from "../services/apiServices"
import { useState } from "react"

export default function List({categories, songs, updateOpenMenu, updateSongs}) {
  const [category, setCategory] = useState(null)
  const [search, setSearch] = useState('')



  function changeFavorite(song) {
    if (category !== 'Избранное') {
      song.isFavorite = !song.isFavorite
      const index = songs.indexOf(song)
      songs[index] = song
      updateSongs([...songs])
      sendRequest('/api/song/' + song._id, 'PUT', song)
    }
  }



  const filterSongs = () => {

    if(category === 'Избранное') {
      songs = songs.filter(song => song.isFavorite)
    } else if (category !== null) {
      songs = songs.filter(song => song.category.match(category))
    }

    if (search) songs = songs.filter(song => song.name.match(search))

    return songs
  }

  const categoriesJSX = categories.map((category, index) =>
    <div
      key={index}
      className="menu__item"
      onClick={() => setCategory(category)}
    >{category}</div>
  )

  const activeCategoryJSX = !category || (
    <div
      className="panel__category panel__btn _small _light"
      onClick={() => setCategory(null)}
    >{category}</div>
  )
    


  return (<>
    <div className="panel__header">
      <input 
        className="search__input"
        placeholder="Поиск" 
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="panel__menu menu">
        <div className="menu__wrapper">
          <div className="menu__item" onClick={() => setCategory('Избранное')}>Избранное</div>
          {categoriesJSX}
        </div>
      </div>
      {activeCategoryJSX}
    </div>

    <div className='list'>
      {filterSongs().map(song => 
        <div className='list__item' key={song._id}>
          <Link
            onClick={updateOpenMenu}
            className="list__name"
            to={song._id}
          >{song.name}</Link>
          <div
            className={'favorite' + (song.isFavorite ? ' _active' : '')} 
            onClick={() => changeFavorite(song)}
          ></div>
        </div>
      )}
    </div>
  </>)
}