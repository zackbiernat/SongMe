import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { GeneratorService } from './generator.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
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
  generatorService: any;

  constructor(generatorService: GeneratorService, private http: HttpClient, private re: Renderer2) {
    this.generatorService = generatorService;
  }

  ngOnInit() {

  }

  playClickHandle() {
    this.MIDIjs = MIDIjs;
    this.fileName = 'https://songme.herokuapp.com/assets/' + this.user + this.songTitle + '.midi';
    MIDIjs.play(this.fileName)
  }

  generateClickHandle() {
    this.MIDIjs = MIDIjs;
    this.song = this.generatorService.makeSong();
    this.songTitle = this.generateSongTitle.nativeElement.value;
    this.user = this.generateSongOwner.nativeElement.value;
    this.fileName = 'https://songme.herokuapp.com/assets/' + this.user + this.songTitle + '.midi';
    let body = {
      song: this.song[0],
      chords: this.song[1],
      songTitle: this.songTitle,
      user: this.user
    };
    let url = 'http://localhost:3000/make/a/song/api';
    if (environment.DEPLOYED === true) {
      url = 'https://songme.herokuapp.com/make/a/song/api'
    }
    this.http.post(url, body).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    })
  }

}
