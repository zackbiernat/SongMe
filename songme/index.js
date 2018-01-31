const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let http = require('http').Server(app);
const makeMidi = require('./src/server/midiGen').makeMidi;
// require('dotenv').config();


let corsOption = {
  origin: "*",
  methods: 'OPTIONS,GET,HEAD,PUT,POST,DELETE',
  credentials: true,
  exposedHeaders: 'token'
};
app.use(cors(corsOption));
app.use(express.static((__dirname + '/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/make/a/song/api', makeMidi);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('SERVER STARTED: Listening on this port:' + port);
});

// Socket config
// let io = require('socket.io').listen(server);
// io.on('connection', (socket) => {
//   console.log('User connected');
//   socket.on('chat message', function(msg){
//     postConversations(msg.toId, msg.fromId, msg.toUN, msg.fromUN, msg.message)
//   });
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   })
// });

