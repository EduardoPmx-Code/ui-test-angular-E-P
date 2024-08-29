import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleComponent } from './single.component';
import { GamesService } from 'src/app/core/services/games.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Game } from 'src/app/core/interfaces/game.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SingleComponent', () => {
  let component: SingleComponent;
  let fixture: ComponentFixture<SingleComponent>;
  let gamesServiceSpy: jasmine.SpyObj<GamesService>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    // Crear un mock para GamesService
    const spy = jasmine.createSpyObj('GamesService', ['getGameById']);

    // Crear un mock para ActivatedRoute
    activatedRouteStub = {
      params: of({ id: '123' })
    };

    await TestBed.configureTestingModule({
      declarations: [SingleComponent],
      providers: [
        { provide: GamesService, useValue: spy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleComponent);
    component = fixture.componentInstance;
    gamesServiceSpy = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set gameId from route params and call getGame on init', () => {
    const mockGame: Game = {
      id: '123',
      title: 'Test Game',
      description: 'A test game description.',
      short_description: 'Short description.',
      developer: 'Test Developer',
      publisher: 'Test Publisher',
      genre: 'Action',
      platform: 'PC',
      release_date: '2022-01-01',
      freetogame_profile_url: 'http://testgame.com/profile',
      game_url: 'http://testgame.com',
      status: 'Active',
      thumbnail: 'http://testgame.com/thumbnail.jpg',
      minimum_system_requirements: {
        os: 'Windows 10',
        processor: 'Intel Core i5',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GTX 970',
        storage: '50 GB available space'
      },
      screenshots: [
        { id: '1', image: 'http://testgame.com/screenshot1.jpg' },
        { id: '2', image: 'http://testgame.com/screenshot2.jpg' }
      ]
    };

    // Mockear la respuesta del servicio
    gamesServiceSpy.getGameById.and.returnValue(of(mockGame));

    fixture.detectChanges(); // Disparar ngOnInit

    expect(component.gameId).toBe('123');
    expect(gamesServiceSpy.getGameById).toHaveBeenCalledWith('123');
    expect(component.game).toEqual(mockGame);
  });

  it('should handle error when getGameById fails', () => {
    // Mockear el error del servicio
    const errorResponse = new Error('Error fetching game data');
    spyOn(console, 'error'); // Espiar el método console.error
    gamesServiceSpy.getGameById.and.returnValue(throwError(() => errorResponse));

    fixture.detectChanges(); // Disparar ngOnInit

    expect(gamesServiceSpy.getGameById).toHaveBeenCalledWith('123');
    expect(component.game).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error fetching game data:', errorResponse);
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    // Espiar el método unsubscribe
    spyOn(component['subscription'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});
