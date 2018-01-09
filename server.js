const express = require('express')
const app = express()

app.get('/', (req, res) => {
  // res.send({super:'genius'})
  res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req, res) => {
  res.send({allTheData:'genius'})
})


app.listen(3005, function() {
  console.log('Express.js server live on 3005')
})