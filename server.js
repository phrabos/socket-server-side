const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
app.use(require('cors')({
  origin: true,
  credentials: true,
}));
const http = require('http').createServer(app)


const io = require('socket.io')(http, {
  cors: {
    origin: true,
  }
})

app.use(express.json());

io.on('connection', socket => {
  console.log(`new connection ${socket.id}`)
  console.log('->>>', socket)

  // socket.on('transmit mouse', (data) => {
  //   console.log(data);
  //   socket.broadcast.emit('mouse response', data)

  // })

  socket.on('ball dropped', data => {
    console.log(new Date(), data)
    io.emit('emit drop', 'ball dropped from server')
  })
})

http.listen(PORT, () => console.log(`server spinning on port ${PORT}`));