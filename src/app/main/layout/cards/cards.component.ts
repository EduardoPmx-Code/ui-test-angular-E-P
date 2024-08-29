import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/core/interfaces/game.interface';
import { Games } from 'src/app/core/interfaces/games.interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() game!:Game;
  @Input() urlRedirection: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
