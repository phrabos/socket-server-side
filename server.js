const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const { instrument } = require('@socket.io/admin-ui');

app.use(require('cors')({
  origin: true,
  credentials: true,
}));

const http = require('http').createServer(app)


const io = require('socket.io')(http, {
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:3000"],
    credentials:true
  }
})
const namespace = io.of('/')
app.use(express.json());

const rooms = io.sockets.adapter.rooms
let num=10001;

io.on('connection', socket => {
  console.log(`new connection ${socket.id}`)

  socket.on('collab', ({id})=>{
    const room = 'room' + num;
    socket.join(room)
    const numOfParticipants = Array.from(namespace.adapter.rooms.get(room)).length
    if(numOfParticipants >= 3)num++

    socket.emit('set room', room);
    // console.log(io.of('/').in(room))
    console.log(namespace.adapter.rooms)
  })
  socket.on('start', () => {
    num++
  })

  socket.on('ball dropped', (room, data) => {
    console.log(room)
    io.to(room).emit('emit drop', data )
  }) 


  socket.on('leave', ()=>{
    console.log(socket)
  })
  
})

instrument(io, {
  auth: false
});

http.listen(PORT, () => console.log(`server spinning on port ${PORT}`));

// +++++++ <ref *1> Server {
//   _events: [Object: null prototype] {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   _nsps: Map(2) {
//     '/' => Namespace {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       sockets: [Map],
//       _fns: [],
//       _ids: 0,
//       server: [Circular *1],
//       name: '/',
//       adapter: [Adapter],
//       [Symbol(kCapture)]: false
//     },
//     '/admin' => Namespace {
//       _events: [Object: null prototype],
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       sockets: [Map],
//       _fns: [],
//       _ids: 0,
//       server: [Circular *1],
//       name: '/admin',
//       adapter: [Adapter],
//       [Symbol(kCapture)]: false
//     }
//   },
//   parentNsps: Map(0) {},
//   _path: '/socket.io',
//   clientPathRegex: /^\/socket\.io\/socket\.io(\.min|\.msgpack\.min)?\.js(\.map)?$/,
//   _connectTimeout: 45000,
//   _serveClient: true,
//   _parser: {
//     protocol: 5,
//     PacketType: {
//       '0': 'CONNECT',
//       '1': 'DISCONNECT',
//       '2': 'EVENT',
//       '3': 'ACK',
//       '4': 'CONNECT_ERROR',
//       '5': 'BINARY_EVENT',
//       '6': 'BINARY_ACK',
//       CONNECT: 0,
//       DISCONNECT: 1,
//       EVENT: 2,
//       ACK: 3,
//       CONNECT_ERROR: 4,
//       BINARY_EVENT: 5,
//       BINARY_ACK: 6
//     },
//     Encoder: [class Encoder],
//     Decoder: [class Decoder extends Emitter]
//   },
//   encoder: Encoder {},
//   _adapter: [class Adapter extends EventEmitter],
//   sockets: <ref *2> Namespace {
//     _events: [Object: null prototype] {
//       connection: [Array],
//       new_namespace: [Function (anonymous)]
//     },
//     _eventsCount: 2,
//     _maxListeners: undefined,
//     sockets: Map(1) { 'vtREmRIooEiuCo-XAAAF' => [Socket] },
//     _fns: [],
//     _ids: 0,
//     server: [Circular *1],
//     name: '/',
//     adapter: Adapter {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       nsp: [Circular *2],
//       rooms: [Map],
//       sids: [Map],
//       encoder: Encoder {},
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false
//   },
//   opts: { cors: { origin: [Array], credentials: true } },
//   eio: Server {
//     _events: [Object: null prototype] {
//       connection: [Function: bound onconnection]
//     },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     clients: {
//       '6OFpf7NwGtsCMHt-AAAA': [Socket],
//       'nPCT1WKs0-P7k-nrAAAE': [Socket]
//     },
//     clientsCount: 2,
//     opts: {
//       wsEngine: [class WebSocketServer extends EventEmitter],
//       pingTimeout: 20000,
//       pingInterval: 25000,
//       upgradeTimeout: 10000,
//       maxHttpBufferSize: 1000000,
//       transports: [Array],
//       allowUpgrades: true,
//       httpCompression: [Object],
//       cors: [Object],
//       allowEIO3: false,
//       path: '/socket.io'
//     },
//     corsMiddleware: [Function: corsMiddleware],
//     ws: WebSocketServer {
//       _events: [Object: null prototype],
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       options: [Object],
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false
//   },
//   httpServer: <ref *3> Server {
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     _events: [Object: null prototype] {
//       connection: [Function: connectionListener],
//       close: [Function: bound close],
//       listening: [Function: bound init],
//       upgrade: [Function (anonymous)],
//       request: [Function (anonymous)]
//     },
//     _eventsCount: 5,
//     _maxListeners: undefined,
//     _connections: 3,
//     _handle: TCP {
//       reading: false,
//       onconnection: [Function: onconnection],
//       [Symbol(owner_symbol)]: [Circular *3]
//     },
//     _usingWorkers: false,
//     _workers: [],
//     _unref: false,
//     allowHalfOpen: true,
//     pauseOnConnect: false,
//     httpAllowHalfOpen: false,
//     timeout: 0,
//     keepAliveTimeout: 5000,
//     maxHeadersCount: null,
//     headersTimeout: 60000,
//     requestTimeout: 0,
//     _connectionKey: '6::::8000',
//     [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//     [Symbol(ServerResponse)]: [Function: ServerResponse],
//     [Symbol(kCapture)]: false,
//     [Symbol(async_id_symbol)]: 8
//   },
//   engine: Server {
//     _events: [Object: null prototype] {
//       connection: [Function: bound onconnection]
//     },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     clients: {
//       '6OFpf7NwGtsCMHt-AAAA': [Socket],
//       'nPCT1WKs0-P7k-nrAAAE': [Socket]
//     },
//     clientsCount: 2,
//     opts: {
//       wsEngine: [class WebSocketServer extends EventEmitter],
//       pingTimeout: 20000,
//       pingInterval: 25000,
//       upgradeTimeout: 10000,
//       maxHttpBufferSize: 1000000,
//       transports: [Array],
//       allowUpgrades: true,
//       httpCompression: [Object],
//       cors: [Object],
//       allowEIO3: false,
//       path: '/socket.io'
//     },
//     corsMiddleware: [Function: corsMiddleware],
//     ws: WebSocketServer {
//       _events: [Object: null prototype],
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       options: [Object],
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false
//   },
//   [Symbol(kCapture)]: false
// }