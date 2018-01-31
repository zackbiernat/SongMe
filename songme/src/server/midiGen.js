let Midi = require('jsmidgen');
let fs = require('fs');

exports.makeMidi = function(req, res) {
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
}
