const express  = require('express');
const httpServer = express();
const dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser');
const config = {
  url: 'https://uni-call.fcc-online.pl',
  login: 'focus02',
  password: ''
};
const { Server } = require('socket.io');
dialer.configure(null);  

httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});


// Serwer nasłuchuje na porcie 3000
const server = httpServer.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  // adres url możemy wygenerować za pomocą komendy
  // gp url 3000
})
const io = new Server(server)

io.on("connection", (socket) => { // nasłuchujemy na rozpoczęcie połączenia
  console.log('Połączono socket');
  io.emit("status", 5555);
});

httpServer.post('/call/', async (req, res) => {
  const number1 = req.body.number;
  const number2 = '555555555' // tutaj dejemy swój numer
  console.log('Dzwonie', number1, number2)
  bridge = await dialer.call(number1, number2);
  let oldStatus = null
  let interval = setInterval(async () => {
    let currentStatus = await bridge.getStatus();
    if (currentStatus !== oldStatus) {
      console.log('WYSYŁAM status', currentStatus)
       oldStatus = currentStatus
       io.emit('status', currentStatus)
    }
    if (
      currentStatus === "ANSWERED" ||
      currentStatus === "FAILED" ||
      currentStatus === "BUSY" ||
      currentStatus === "NO ANSWER"
  ) {
      console.log('stop')
      clearInterval(interval)
  }
 }, 1000)
 res.json({ id: '123', status: bridge.STATUSES.NEW });
 })
 