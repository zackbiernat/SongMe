import { Component, OnInit } from '@angular/core';
import { GeneratorService } from './generator.service';
import { HttpClient } from '@angular/common/http';
console.log(HttpClient)

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers: [GeneratorService, HttpClient]
})
export class GeneratorComponent implements OnInit {

  constructor(generatorService: GeneratorService, private http: HttpClient) {
    this.song = generatorService.makeSong();
  }

  ngOnInit() {
    let body = {
      song: this.song[0],
      chords: this.song[1],
      songTitle: 'MyFirstSong',
      user: 'Zack'
    };
    this.http.post('http://localhost:3000/make/a/song/api', body).subscribe(data => {
      console.log(data.result);
    })
  }

  generate() {

  }

}
