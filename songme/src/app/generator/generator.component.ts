import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { GeneratorService } from './generator.service';
import { HttpClient } from '@angular/common/http';

declare let MIDIjs: any;

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers: [GeneratorService, HttpClient]
})
export class GeneratorComponent implements OnInit {
  @ViewChild('generateSongTitle') generateSongTitle: ElementRef;
  @ViewChild('generateSongOwner') generateSongOwner: ElementRef;

  song: number[];
  user: string;
  songTitle: string;
  fileName: string;
  MIDIjs: any;

  constructor(generatorService: GeneratorService, private http: HttpClient, private re: Renderer2) {
    this.song = generatorService.makeSong();
    this.MIDIjs = MIDIjs;
  }

  ngOnInit() {

  }

  generateClickHandle(e) {
    this.songTitle = this.generateSongTitle.nativeElement.value;
    this.user = this.generateSongOwner.nativeElement.value;
    this.fileName = 'assets/' + this.user + this.songTitle + '.midi';
    let body = {
      song: this.song[0],
      chords: this.song[1],
      songTitle: this.songTitle,
      user: this.user
    };
    console.log(this.fileName)
    this.http.post('http://localhost:3000/make/a/song/api', body).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
  }

}
