let Midi = require('jsmidgen');
let fs = require('fs');

exports.makeMidi = function(req, res) {
  let file = new Midi.File();
  let track = new Midi.Track();
  let song = req.body.song;
  // console.log(req.body.song) ...checks out
  file.addTrack(track);
  // quarter: 64, half: 128, 8th: 32
  let key = {
    1: 'c4',
    2: 'd4',
    3: 'e4',
    4: 'f4',
    5: 'g4',
    6: 'a4',
    7: 'b4',
    8: 'c5',
    9: 'd5',
    10: 'e5',
    11: 'f5',
    12: 'g5',
    13: 'a5',
    14: 'b5',
    15: 'c6'
  };
  song.forEach(measure => {
    if (measure.length === 1) {
      track.addNote(0, key[measure[0] + 1], 256);
    } else if (measure.length === 2) {
      track.addNote(0, key[measure[0] + 1], 128);
      track.addNote(0, key[measure[1] + 1], 128);
    } else if (measure.length === 3) {
      track.addNote(0, key[measure[0] + 1], 128);
      track.addNote(0, key[measure[1] + 1], 64);
      track.addNote(0, key[measure[2] + 1], 64);
    } else { //Should change if allowing more than 4 measures per bar
      track.addNote(0, key[measure[0] + 1], 64);
      track.addNote(0, key[measure[1] + 1], 64);
      track.addNote(0, key[measure[2] + 1], 64);
      track.addNote(0, key[measure[3] + 1], 64);
    }
  })

  let nameOfSong = req.body.user + req.body.songTitle;
  let qs = 'src/server/assets/' + nameOfSong + '.midi'
  fs.writeFileSync(qs, file.toBytes(), 'binary');
  res.sendStatus(200)
}
