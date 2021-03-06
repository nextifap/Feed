const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(
  'mongodb+srv://franklin:Apocalipse@cluster0-b0xwr.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
)

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(cors())
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
)
app.use(require('./routes'))

server.listen(process.env.PORT || 3000)
