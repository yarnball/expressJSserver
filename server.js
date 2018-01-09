const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  // GET THE HOME PAGE
  res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req, res) => {
  res.send({allTheData:'geneeius'})
})

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!', req.body)
})

app.listen(3005, function() {
  console.log('Express.js server live on 3005')
})