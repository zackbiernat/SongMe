const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let http = require('http').Server(app);
let Midi = require('jsmidgen');
let fs = require('fs');
// require('dotenv').config();


let corsOption = {
  origin: "*",
  methods: 'OPTIONS,GET,HEAD,PUT,POST,DELETE',
  credentials: true,
  exposedHeaders: 'token'
};
app.use(cors(corsOption));
app.use(express.static((__dirname + '/src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/make/a/song/api', (req, res) => {
  console.log('Received a song request');
  let file = new Midi.File();
  let track = new Midi.Track();
  file.addTrack(track);
  track.addNote(0, 'c4', 64);
  track.addNote(0, 'e4', 64);
  track.addNote(0, 'g4', 64);
  let nameOfSong = req.body.user + req.body.songTitle;
  let qs = 'src/server/assets/' + nameOfSong + '.midi'
  fs.writeFileSync(qs, file.toBytes(), 'binary');
  res.sendStatus(200)
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
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

