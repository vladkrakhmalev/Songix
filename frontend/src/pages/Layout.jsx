import { Outlet, useNavigate } from 'react-router-dom'
import List from '../components/List'
import { useEffect, useState } from 'react'
import apiServices from "../services/apiServices"

export default function Layout() {  
  const [songs, setSongs] = useState([])
  const [openMenu, setOpenMenu] = useState(true)
  const navigate = useNavigate()
  const categories = ['Хлебопреломление','Жатва','Рождество']

  function updateOpenMenu() {
    setOpenMenu(!openMenu)
  }

  function updateSongs(songs) {
    setSongs(songs)
  }

  function addSongHandler() {
    updateOpenMenu()
    navigate('/songs/new')
  }

  async function getSongs() {
    const result = await apiServices.sendRequest('/api/songs/', 'GET')
    result.success ? setSongs(result.songs) : navigate('/auth')
  }

  async function logout() {
    await apiServices.sendRequest('/api/logout', 'POST')
    navigate('/auth')
  }
 
  useEffect(() => {getSongs()} ,[])

  return (
    <div className="panel">
      <div className={'panel__column _left' + (openMenu ? '' : ' _hide')}>
        <List
          categories={categories}
          songs={songs}
          updateOpenMenu={updateOpenMenu}
          updateSongs={updateSongs}
        />
        <div className="panel__btn _add" onClick={addSongHandler}>Добавить песню</div>
        <div className="panel__btn _light" onClick={logout}>Выйти</div>
      </div>
      <div className="panel__column _right">
        <Outlet context={[categories, songs, setSongs, updateOpenMenu]}/>
      </div>
    </div>
  )
}
