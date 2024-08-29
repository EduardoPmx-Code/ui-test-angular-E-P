import { Component, Input, OnInit } from '@angular/core';
import { Screenshot } from 'src/app/core/interfaces/game.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() images!:Array<Screenshot>

  constructor() { }

  ngOnInit(): void {
  }

}
