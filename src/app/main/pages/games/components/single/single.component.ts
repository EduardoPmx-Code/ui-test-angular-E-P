import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/core/interfaces/game.interface';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  gameId: string = '';
  game: Game | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private gameService: GamesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.gameId = params['id'];
        this.getGame();
      })
    );
  }

  getGame(): void {
    this.subscription.add(
      this.gameService.getGameById(this.gameId).subscribe(
        data => {
          this.game = data;
          console.log(data)
        },
        error => {
          console.error('Error fetching game data:', error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
