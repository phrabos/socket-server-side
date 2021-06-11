const express = require('express');
const { setUncaughtExceptionCaptureCallback } = require('process');
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

  socket.on('join room', (room) => {
    console.log(socket)

    socket.join(room)
  })

  socket.on('ball dropped', (room, data) => {
    io.to(room).emit('emit drop', data )
  }) 
    
  
  socket.on('ball move', data=> {
    io.emit('ball move', data)
  })

  socket.on('leave', ()=>{
    console.log(socket)
  })
  
})


http.listen(PORT, () => console.log(`server spinning on port ${PORT}`));