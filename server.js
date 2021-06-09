const cors = require('cors');
const express = require('express');
const http = require('http');
const app = express();
app.use(cors());
const server = http.createServer(app);
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8000
// const path = require('path');


const io = socketIo(server, {
  cors: {
    origins: ['https://heuristic-yalow-f5bcbc.netlify.app'],
    // handlePreflightRequest: (req, res) => {
    //   res.writeHead(200, {
    //     "Access-Control-Allow-Origin": "https://heuristic-yalow-f5bcbc.netlify.app/",
    //     "Access-Control-Allow-Methods": "GET, POST",
    //     "Access-Control-Allow-Headers": "*",
    //     "Access-Control-Allow-Credentials": true 
    //   })
    //   res.end();
    // }
  }
});


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