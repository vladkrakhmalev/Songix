const User = require('../models/userModel')

class songController {

  async getSongs(req, res) {
    try {
      const user = await User.findById(req.userID)
      res.json({success: true, songs: user.songs})
    } catch (e) {
      return res.json({success: false, message: e})   
    }
  }

  async getSong(req, res) {
    try {
      const user = await User.findById(req.userID)
      const song = user.songs.id(req.params.id)
      if (song === null) {
        res.json({success: false, message: 'Песня не найдена'})   
      }
      res.json({success: true, song})
    } catch (e) {
      return res.json({success: false, message: e})   
    }
  }

  async addSong(req, res) {
    try {
      const user = await User.findById(req.userID)
      const song = user.songs.create({
        category: req.body.category,
        name: req.body.name,
        text: req.body.text,
        tonality: req.body.tonality,
        temp: req.body.temp,
      })
      user.songs.push(song)
      await user.save()
      res.json({success:true, song})
    } catch (e) {
      return res.json({success: false, message: e})   
    }
  }

  async editSong(req, res) {
    try {
      const user = await User.findById(req.userID)
      const song = user.songs.id(req.params.id)
      song.name = req.body.name
      song.text = req.body.text
      song.category = req.body.category
      song.tonality = req.body.tonality
      song.temp = req.body.temp
      song.isFavorite = req.body.isFavorite
      await user.save()
      res.json({success:true, songs: user.songs})
    } catch (e) {
      return res.status(400).json({success: false, message: e})   
    }
  }

  async deleteSong(req, res) {
    try {
      const user = await User.findById(req.userID)
      user.songs.id(req.params.id).deleteOne()
      await user.save()
      res.json({success:true, songs: user.songs})
    } catch (e) {
      return res.status(400).json({success: false, message: e})   
    }
  }

}

module.exports = new songController()