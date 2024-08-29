import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CardsComponent, 
        TruncatePipe 
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly bind @Input() game', () => {
    const game = {
      title: 'Test Game',
      developer: 'Test Developer',
      freetogame_profile_url: 'http://example.com',
      game_url: 'http://example.com/game',
      genre: 'Action',
      id: '1',
      platform: 'PC',
      publisher: 'Test Publisher',
      release_date: '2024-01-01',
      short_description: 'This is a short description.',
      thumbnail: 'http://example.com/thumbnail.jpg'
    };

    component.game = game;
    fixture.detectChanges();

    expect(component.game).toEqual(game);
  });

  it('should correctly bind @Input() urlRedirection', () => {
    const url = 'http://example.com/redirect';
    component.urlRedirection = url;
    fixture.detectChanges();

    expect(component.urlRedirection).toBe(url);
  });

  it('should render the image source correctly', () => {
    const game = {
      title: 'Test Game',
      developer: 'Test Developer',
      freetogame_profile_url: 'http://example.com',
      game_url: 'http://example.com/game',
      genre: 'Action',
      id: '1',
      platform: 'PC',
      publisher: 'Test Publisher',
      release_date: '2024-01-01',
      short_description: 'This is a short description.',
      thumbnail: 'http://example.com/thumbnail.jpg'
    };

    component.game = game;
    fixture.detectChanges();

    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toBe(game.thumbnail);
  });
});
