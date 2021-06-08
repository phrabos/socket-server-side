const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
// const path = require('path');

const PORT = process.env.PORT || 8000

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origins: ['*'],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "https://heuristic-yalow-f5bcbc.netlify.app/",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": true 
      })
      res.end();
    }
  }
});


app.use(cors());
// app.use(express.static(path.join(__dirname, '/client/public')))
// console.log(path.join('/client/public'))

io.on('connection', socket => {
  console.log(`new connection ${socket.id}`)
  socket.join('general')
  socket.emit('new-client', 'front and back wired up')
  socket.on('chat-input', (text) => {
    console.log(text);
    socket.broadcast.emit('chat-received', text)
    // socket.broadcast.emit('received-message', message)
  })
})


server.listen(PORT, () => console.log(`server spinning on port ${PORT}`));