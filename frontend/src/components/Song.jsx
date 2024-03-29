import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import sanitizeHtml from 'sanitize-html'
import ContentEditable from "react-contenteditable";
import transpositionServices from "../services/transpositionServices"
import apiServices from "../services/apiServices"

export default function Song({isNew}) {
  const [categories, songs, setSongs, updateOpenMenu] = useOutletContext()
  const [song, setSong] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [sizeText, setSizeText] = useState(18)
  const {id} = useParams() 
  const navigate = useNavigate()
  const disabledClass = disabled ? " _disabled" : ''

  

  function handleDecorate(song) {
    const newSong = transpositionServices.decorateSong(song)
    setSong(newSong)
  }

  function handleChange(e, prop) {
    console.log(e.target.value)
    const newSong = {...song}
    newSong[prop] = sanitizeHtml(e.target.value, {
      allowedTags: ['br', 'div']
    })
    setSong(newSong)
  }

  function handleTranspose(isUp) {
    const newSong = transpositionServices.transposeSong(song, isUp)
    setSong(newSong)
  }

  function generateSong() {
    setSong({
      isFavorite: false,
      category: '',
      name: '',
      text: '',
      tonality: '',
      temp: '',
    })
    setDisabled(false)
  }

  async function getSong(id) {
    setDisabled(true)
    if (songs.length === 0) {
      const result = await apiServices.sendRequest('/api/song/' + id, 'GET')
      result.success ? handleDecorate(result.song) : console.log(result.message)
    } else {
      const song = songs.find(song => song._id == id)
      handleDecorate(song)
    }
  }

  async function addSong() {
    setDisabled(!disabled)
    handleDecorate(song)
    const result = await apiServices.sendRequest('/api/song', 'POST', song)
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
    const oldSong = songs.find(x => x._id === song._id)
    const index = songs.indexOf(oldSong)
    songs[index] = song
    setSongs([...songs])
    apiServices.sendRequest('/api/song/' + song._id, 'PUT', song)
  }

  async function deleteSong() {
    if (!isNew) {
      const index = songs.findIndex(curSong => curSong._id == song._id)
      songs.splice(index, 1)
      setSongs(songs)
      apiServices.sendRequest('/api/song/' + song._id, 'DELETE', song)
    }
    navigate('/songs')
  }

  useEffect(() => {
    isNew ? generateSong() : getSong(id)
  },[id, songs])


  
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

  
  
  return song && <div className='song'>
    <div className="song__header">
      <div className="panel__open-menu" onClick={updateOpenMenu}></div>

      <input
        className={'song__name' + disabledClass}
        value={song.name}
        readOnly={disabled}
        type="text"
        onChange={e => handleChange(e, 'name')}
        placeholder="Название"
        required
      />

      <div className="panel__menu menu">
        <div className="menu__wrapper">
          <div className="menu__tool">
            <div className="menu__tool-btn" onClick={() => setSizeText(sizeText-2)}>-</div>
            <div className="menu__tool-value">{sizeText}</div>
            <div className="menu__tool-btn" onClick={() => setSizeText(sizeText+2)}>+</div>
            <div className="menu__tool-name">Размер</div>
          </div>

          <div className="menu__tool">
            <div className="menu__tool-btn" onClick={() => handleTranspose(false)}>-</div>
            <div className="menu__tool-value">{song.tonality}</div>
            <div className="menu__tool-btn" onClick={() => handleTranspose(true)}>+</div>
            <div className="menu__tool-name">Тональность</div>
          </div>
          {disabled ? editButton : saveButton}
          {deleteButton}
        </div>
      </div>
    </div>

    <div className={"song__subheader" + disabledClass}>
      <select
        className='song__select'
        value={song.category}
        onChange={e => handleChange(e, 'category')}
      >
        <option value=''>Категория</option>
        {categories.map((category, id) => 
          <option value={category} key={id}>{category}</option>
        )}
      </select>

      <select
        className='song__select'
        value={song.tonality}
        onChange={e => handleChange(e, 'tonality')}
      >
        <option value=''>Тональность</option>
        {transpositionServices.getTonalities().map((tonality, id) => 
          <option value={tonality} key={id}>{tonality}</option>
        )}
      </select>

      <input
        className='song__input'
        value={song.temp || ''}
        readOnly={disabled}
        onChange={e => handleChange(e, 'temp')}
        placeholder="Темп"
        type='number'
        min={0}
        max={1000}
      />
    </div>

    <ContentEditable
      className={'song__text' + disabledClass}
      disabled={disabled}
      html={song.text || ''}
      style={{fontSize: sizeText}}  
      onChange={e => handleChange(e, 'text')}
    />
  </div>
}