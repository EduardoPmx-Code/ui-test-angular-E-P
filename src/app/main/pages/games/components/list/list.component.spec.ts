import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GamesService } from 'src/app/core/services/games.service';
import { ListComponent } from './list.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let gamesServiceSpy: jasmine.SpyObj<GamesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GamesService', ['getGames']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ListComponent],
      providers: [
        { provide: GamesService, useValue: spy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    gamesServiceSpy = TestBed.inject(GamesService) as jasmine.SpyObj<GamesService>;

    // Configura el espía para devolver un observable con un array vacío
    gamesServiceSpy.getGames.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllGames on initialization', () => {
    // Verifica que getAllGames se llama en ngOnInit
    spyOn(component, 'getAllGames').and.callThrough();
    component.ngOnInit();
    expect(component.getAllGames).toHaveBeenCalled();
  });

  it('should update paginatedGames$ when getAllGames is called', () => {
    // Configura el espía para devolver un array de juegos ficticios
    const mockGames = [
      { title: 'Game 1' },
      { title: 'Game 2' },
      // Agrega más juegos si es necesario
    ];
    gamesServiceSpy.getGames.and.returnValue(of(mockGames));

    component.ngOnInit(); // Llama a ngOnInit para ejecutar getAllGames
    component.paginatedGames$.subscribe(paginatedGames => {
      expect(paginatedGames.length).toBeGreaterThan(0); // Verifica que hay juegos en la página
    });
  });

  it('should change page and update currentPageSubject', () => {
    component.changePage(2);
    expect(component.currentPageSubject.getValue()).toBe(2); // Verifica que la página actual se actualiza
  });

  it('should reset search form and page on clearSearch', () => {
    component.clearSearch();
    expect(component.searchForm.value).toEqual({
      platform: '',
      category: '',
      sortBy: '',
      tags: '',
      name: ''
    });
    expect(component.currentPageSubject.getValue()).toBe(1);
  });

  afterEach(() => {
    // Limpia después de cada prueba
    component.ngOnDestroy();
  });
});
