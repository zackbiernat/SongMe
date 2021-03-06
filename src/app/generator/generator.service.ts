export class GeneratorService {
  partOfProgression;
  progression;
  constructor() {
    this.partOfProgression = [];
    this.progression = [];
  };

  makeSong() {
    this.progressionGen(1, 64);
    return [this.melody(), this.progression];
  };

  rando(range1, range2) {
    return Math.floor(Math.random() * Math.abs(range2-range1)) + range1;
  };

  choose(inputs) {
    var choice = this.rando(1, inputs.length+1)
    switch (choice) {
      case 1:
        return inputs[0];
      case 2:
        return inputs[1];
      case 3:
        return inputs[2];
      case 4:
        return inputs[3];
    }
  }

  progressionGen(chord, length) {
    this.partOfProgression.push(chord);
    length--;
    if (length === 0){
       this.progression.push(this.partOfProgression);
       return;
    }
    switch (chord) {
      case 1:
        return this.progressionGen(this.rando(1, 8), length);
      case 2:
        return this.progressionGen(5, length);
      case 3:
        return this.progressionGen(this.choose([4,6]), length);//returns 6 or 4
      case 4:
        return this.progressionGen(this.choose([1,2,5]), length);
      case 5:
        return this.progressionGen(this.choose([1,6]), length);
      case 6:
        return this.progressionGen(this.choose([2,4]), length);
      case 7:
        return this.progressionGen(this.choose([1,5]), length);
    }
  };

  melody = function() {
    //should iterate over progression and determine notes for a melody
    var melody = [];
    for (var i = 0; i < this.partOfProgression.length; i++) {
      var pitch = this.partOfProgression[i] + (this.choose([0, 2, 4, 7]));
      switch (this.rando(0,10)) {
      case 0:
        melody.push([pitch]);
        break;
      case 1:
        melody.push([pitch, pitch + 1]);
        break;
      case 2:
        melody.push([pitch, pitch, pitch +2]);
        break;
      case 3:
        melody.push([pitch, pitch +2, pitch, pitch -1]);
        break;
      case 4:
        melody.push([pitch -1, pitch]);
        break;
      case 5:
        melody.push([pitch, pitch + 4]);
        break;
      case 6:
        melody.push([pitch, pitch -1, pitch - 2]);
        break;
      case 7:
        melody.push([pitch, pitch -3, pitch -2, pitch]);
        break;
      case 8:
        melody.push([pitch, pitch -1, pitch]);
        break;
      case 9:
        melody.push([pitch, pitch +1, pitch +2]);
        break;
      }
    }
    return melody;
  };
}