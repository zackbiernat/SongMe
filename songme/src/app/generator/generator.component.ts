import { Component, OnInit } from '@angular/core';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
  providers: [GeneratorService]
})
export class GeneratorComponent implements OnInit {

  constructor(generatorService: GeneratorService) {
    generatorService.makeSong();
  }

  ngOnInit() {
  }

  generate() {

  }

}
