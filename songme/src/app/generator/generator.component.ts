import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { GeneratorService } from './generator.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(generatorService: GeneratorService, private http: HttpClient, private re: Renderer2) {
    this.song = generatorService.makeSong();
  }

  ngOnInit() {

  }

  generateClickHandle(e) {
    this.songTitle = this.generateSongTitle.nativeElement.value;
    this.user = this.generateSongOwner.nativeElement.value;
    let body = {
      song: this.song[0],
      chords: this.song[1],
      songTitle: this.songTitle,
      user: this.user
    };
    this.http.post('http://localhost:3000/make/a/song/api', body).subscribe(data => {
      console.log(data['result']);
    })
  }

}
