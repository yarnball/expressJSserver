const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.json()); 

app.post('/test', function (req, res) {
  console.log('Hellooooooooooooooooo!', req.body)
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 

app.get('/', (req, res) => {
  // GET THE HOME PAGE
  res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req, res) => {
  res.send({allTheData:'geneeius'})
})


app.listen(3005, function() {
  console.log('Express.js server live on 3005')
})


// CORS FIX (from different server)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});