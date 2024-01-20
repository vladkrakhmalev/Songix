const tonalities = ['H','A#','A','G#','G','F#','F','E','D#','D','C#','C',]

class songServices {

  decorateSong(oldSong) {
    const song = {...oldSong}
    const regexp = new RegExp(`>?(${tonalities.join('m?7?|')}m?7?)`, 'g')

    song.text = oldSong.text.replaceAll(regexp, match => {
      return match.match('>') === null ? `<span class='song__chord'>${match}</span>` : match
    })

    return song
  }
  
  transposeSong(oldSong, isUp) {
    const song = {...oldSong}
    const regexp = new RegExp(`${tonalities.join('|')}`, 'g')

    song.text = oldSong.text.replaceAll(regexp, tonality => {
      let id = tonalities.indexOf(tonality)
        
      if (isUp) {
        id = id === 0 ? tonalities.length-1 : id-1
      } else {
        id = id === tonalities.length-1 ? 0 : id+1
      }

      return tonalities[id]
    })

    return song
  }
  
}

module.exports = new songServices()