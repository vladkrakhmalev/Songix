const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')

const {PORT, DB_CONECT} = require('./config')
const songRoutes = require('./routes/songRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express()
const staticPath = path.join(__dirname, '../frontend/build')

app.use(express.static(staticPath));
app.use(express.json())
app.use(cookieParser())
app.use('/api', songRoutes)
app.use('/api', authRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

async function start() {
  try {
    
    await mongoose.connect(DB_CONECT)

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`)
    })
 
  } catch(e) {
    console.log(e)
  }
}

start()