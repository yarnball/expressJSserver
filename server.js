var cors = require('cors')
var fetch = require('node-fetch')
const bodyParser= require('body-parser')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const convert = require('xml-js')

// our localhost port
const port = 3005

const app = express()

app.use(cors())

app.use(bodyParser.json())
// Need to use body parser to get JSON post data

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

app.post('/test', function (req, res) {
  console.log('Hmm', req.body)
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.post('/quotes', (req, res) => {
  let dataSend = ''
     fetch(
           'http://www.abc.net.au/news/feed/2022/rss', {
            method: 'GET',
        })
      .then((response) => response.text())
      .then((text) => {
        const result1 = convert.xml2json(text, { compact: true, spaces: 4 })
        const formattedJSON = JSON.parse(result1)
        // console.log(formattedJSON)
        res.send({allTheData:formattedJSON.rss.channel})
      })
})

app.get('/', (req, res) => {
  // GET THE HOME PAGE
  res.sendFile(__dirname + '/index.html')
})

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  
  socket.on('TYPING', (bool) => {
    console.log('TYPING', bool.length > 3)
    io.sockets.emit('TYPING', bool.length > 3)
  })

  socket.on('SENDMSG', (message) => {
    console.log('Color Changed to: ', message)
    io.sockets.emit('SENDMSG', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))