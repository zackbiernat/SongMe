let Midi = require('jsmidgen');
let fs = require('fs');
const path = require('path')

exports.makeMidi = function(req, res) {
  let file = new Midi.File();
  let melody = new Midi.Track();
  let accomp = new Midi.Track();
  let nameOfSong = req.body.user + req.body.songTitle;
  // let qs = 'src/server/assets/' + nameOfSong + '.midi';
  let qs = 'dist/assets/' + nameOfSong + '.midi';
  let song = req.body.song;
  let chords = req.body.chords;
  file.addTrack(melody);
  file.addTrack(accomp);
  // accomp.addNote(1, 'c3', 2256);
  // quarter: 64, half: 128, 8th: 32
  let key = {
    "-1": 'a3',
    0: 'b3',
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
    15: 'c6',
    16: 'd6',
    17: 'e6',
    18: 'f6'
  };
  song.forEach(measure => {
    if (measure.length === 1) {
      melody.addNote(0, key[measure[0] + 1], 256);
    } else if (measure.length === 2) {
      melody.addNote(0, key[measure[0] + 1], 128);
      melody.addNote(0, key[measure[1] + 1], 128);
    } else if (measure.length === 3) {
      melody.addNote(0, key[measure[0] + 1], 128);
      melody.addNote(0, key[measure[1] + 1], 64);
      melody.addNote(0, key[measure[2] + 1], 64);
    } else { //Should change if allowing more than 4 measures per bar
      melody.addNote(0, key[measure[0] + 1], 64);
      melody.addNote(0, key[measure[1] + 1], 64);
      melody.addNote(0, key[measure[2] + 1], 64);
      melody.addNote(0, key[measure[3] + 1], 64);
    }
  })
  chords[0].forEach(chord => {
    accomp.addNoteOn(0, key[chord + 1]);
    accomp.addNoteOn(0, key[chord + 3]);
    accomp.addNoteOn(0, key[chord + 5]);
    accomp.addNoteOff(0, key[chord + 1], 256);
    accomp.addNoteOff(0, key[chord + 3]);
    accomp.addNoteOff(0, key[chord + 5]);
  })
  fs.writeFile(qs, file.toBytes(), 'binary', () => {  //TODO: actually send file to client
    // let filePath = path.join(__dirname, '/assets/' + nameOfSong + '.midi');
    // let stat = fs.statSync(filePath);
    // let file = fs.readFile(filePath, 'binary', () => {
    //   res.setHeader('Content-Length', stat.size);
    //   res.setHeader('Content-Type', 'audio/midi');
      //res.setHeader('Content-Disposition', 'attachment; filename=' + filePath);
      // res.sendFile(filePath);

    // });
    res.send({result: 'Hey there'})
  });
}
