class songServices {
  #tonalities = ['H','B','A','G#','G','F#','F','E','D#','D','C#','C',]

  #transposeChord(chord, isUp) {
    let id = this.#tonalities.indexOf(chord)
      
    if (isUp) {
      id = id === 0 ? this.#tonalities.length-1 : id-1
    } else if (id !== -1) {
      id = id === this.#tonalities.length-1 ? 0 : id+1
    }
  
    return this.#tonalities[id]
  }

  getTonalities() {
    return this.#tonalities
  }

  decorateSong(oldSong) {
    const song = {...oldSong}
    const regexp = new RegExp(`(${this.#tonalities.join('b?m?7?[\\s/]|')}b?m?7?[\\s/])`, 'g')
    song.text = oldSong.text.replaceAll(regexp, match => {
      return `<span class='song__chord'>${match}</span>`
    })

    return song
  }
  
  transposeSong(oldSong, isUp) {
    const song = {...oldSong}
    const regexp = new RegExp(`${this.#tonalities.join('|')}`, 'g')
    song.text = oldSong.text.replaceAll(regexp, chord => this.#transposeChord(chord, isUp ))
    song.tonality = this.#transposeChord(song.tonality, isUp)
    return song
  }
  
}

export default new songServices()