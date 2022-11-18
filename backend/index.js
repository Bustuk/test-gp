const express  = require('express');
const httpServer = express();
const dialer = require('dialer').Dialer;

// Serwer nasłuchuje na porcie 3000
httpServer.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  // adres url możemy wygenerować za pomocą komendy
  // gp url 3000
})

// Definiowanie odpowiedzi na request get 
httpServer.get('/hello', function (req, res) {
  console.log('url get /')
  res.json({'message': 'Hello World'})
})
