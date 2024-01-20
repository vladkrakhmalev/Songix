import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { sendRequest } from "../services/apiServices";
import { decorateSong, transposeSong } from "../services/transpositionServices";
import ContentEditable from "react-contenteditable";

export default function Song({isNew}) {
  const [songs, setSongs, updateOpenMenu] = useOutletContext()
  const [song, setSong] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [sizeText, setSizeText] = useState(18)
  const {id} = useParams() 
  const navigate = useNavigate()
  const disabledClass = disabled ? " _disabled" : ''
  const categories = ['Хлебопреломление','Жатва','Рождество']

  function handleChange(e, prop) {
    const newSong = {...song}
    newSong[prop] = e.target.value
    setSong(newSong)
  }

  function handlePaste(e) {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const newSong = {...song}
    newSong.text = text
    setSong(newSong)
  }

  function handleTranspose(isUp) {
    const newSong = transposeSong(song, isUp)
    setSong(newSong)
  }

  function generateSong() {
    setSong({
      isFavorite: false,
      category: '',
      name: '',
      text: '',
    })
    setDisabled(false)
  }

  async function getSong(id) {
    setDisabled(true)
    if (songs.length === 0) {
      const result = await sendRequest('/api/song/' + id, 'GET')
      result.success ? setSong(result.song) : console.log(result.message)
    } else {
      const song = songs.find(song => song._id == id)
      setSong(song)
    }
  }

  async function addSong() {
    setDisabled(!disabled)
    const newSong = decorateSong(song)
    setSong(newSong)
    const result = await sendRequest('/api/song', 'POST', newSong)
    if (result.success) {
      songs.push(result.song)
      setSongs(songs)
      navigate('/songs/' + result.song._id)
    } else {
      console.log(result.message)
    }
  }

  async function editSong() {
    setDisabled(!disabled)
    const newSong = decorateSong(song)
    setSong(newSong)
    sendRequest('/api/song/' + song._id, 'PUT', newSong)
  }

  async function deleteSong() {
    if (!isNew) {
      const index = songs.findIndex(curSong => curSong._id == song._id)
      songs.splice(index, 1)
      setSongs(songs)
      sendRequest('/api/song/' + song._id, 'DELETE', song)
    }
    navigate('/songs')
  }

  useEffect(() => {
    isNew ? generateSong() : getSong(id)
  },[id])


  
  const editButton = <div
    className="panel__btn _small _light _edit"
    onClick={() => setDisabled(false)}
  >Редактировать</div>

  const saveButton = <div
    className="panel__btn _small _light _save"
    onClick={() => isNew ? addSong() : editSong()}
  >Сохранить</div>

  const deleteButton = <div
    className="panel__btn _small _light _delete"
    onClick={() => deleteSong()}
  >Удалить</div>

  
  
  return <div className='song'>
    <div className="song__header">
      <div className="panel__open-menu" onClick={updateOpenMenu}></div>

      <textarea
        className={'song__name' + disabledClass}
        value={song.name}
        readOnly={disabled}
        onChange={e => handleChange(e, 'name')}
        rows={1}
        placeholder="Название песни"
      />

      <div className="panel__menu menu">
        <div className="menu__wrapper">
          <div className="menu__tonality">
            <div className="menu__tonality-btn" onClick={() => setSizeText(sizeText-2)}>-</div>
            <div className="menu__tonality-btn" onClick={() => setSizeText(sizeText+2)}>+</div>
            <div className="menu__tonality-name">Изменить размер</div>
          </div>
          <div className="menu__tonality">
            <div className="menu__tonality-btn" onClick={() => handleTranspose(false)}>-</div>
            <div className="menu__tonality-btn" onClick={() => handleTranspose(true)}>+</div>
            <div className="menu__tonality-name">Транспонировать</div>
          </div>
          {disabled ? editButton : saveButton}
          {deleteButton}
        </div>
      </div>
    </div>

    <div className="song__subheader">
      <select
        className={'song__select' + disabledClass}
        defaultValue={song.category}
        onChange={e => handleChange(e, 'category')}
      >
        <option value=''>Выберете категорию</option>
        {categories.map((category, id) => 
          <option value={category} key={id}>{category}</option>
        )}
      </select>
    </div>

    <ContentEditable
      className={'song__text' + disabledClass}
      disabled={disabled}
      html={song.text || ''}
      style={{fontSize: sizeText}}  
      onChange={e => handleChange(e, 'text')}
      onPaste={handlePaste}
    />
  </div>
}