import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/core/services/games.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  games$!: Observable<any[]>;
  currentPageSubject = new BehaviorSubject<number>(1);
  private pageSize = 12;
  totalPages!: number;
  currentPage = 1;
  urlRedirection = '/main/games/single'

  paginatedGames$!: Observable<any[]>;
  private destroy$ = new Subject<void>();

  searchForm: FormGroup;

  categories = [
    {
      name:'MMO',
      value:'mmo'
    }, 
    {
      name:'MMORPG',
      value:'mmorpg',
    },{
      name: 'Shooter',
      value:'Shooter'
    },
    {
      name:'Strategy',
      value:'strategy'
    },
    {
      name:'Moba',
      value:'moba'
    },
    {
      name:'Card Games',
      value:'card'
    }, 
    {
      name:'Racing',
      value:'racing'
    },
    {
      name:'Sports',
      value:'sports'
    }, 
    {
      name:'Social',
      value:'social'
    }, 
    {
      name:'Fighting',
      value:'fighting'
    }
  ];
  tagsList = [
    { name: 'MMOFPS', value: 'mmofps' },
    { name: 'Action RPG', value: 'action-rpg' },
    { name: 'Sandbox', value: 'sandbox' },
    { name: 'Open World', value: 'open-world' },
    { name: 'Survival', value: 'survival' },
    { name: 'Battle Royale', value: 'battle-royale' },
    { name: 'MMOTPS', value: 'mmotps' },
    { name: 'Anime', value: 'anime' },
    { name: 'PvP', value: 'pvp' },
    { name: 'PvE', value: 'pve' },
    { name: 'Pixel', value: 'pixel' },
    { name: 'MMORTS', value: 'mmorts' },
    { name: 'Fantasy', value: 'fantasy' },
    { name: 'Sci-Fi', value: 'sci-fi' },
    { name: 'Action', value: 'action' },
    { name: 'Voxel', value: 'voxel' },
    { name: 'Zombie', value: 'zombie' },
    { name: 'Turn-Based', value: 'turn-based' },
    { name: 'First Person View', value: 'first-person' },
    { name: 'Third Person View', value: 'third-Person' },
    { name: 'Top-Down View', value: 'top-down' },
    { name: '3D Graphics', value: '3d' },
    { name: '2D Graphics', value: '2d' },
    { name: 'Tank', value: 'tank' },
    { name: 'Space', value: 'space' },
    { name: 'Sailing', value: 'sailing' },
    { name: 'Side Scroller', value: 'side-scroller' },
    { name: 'Superhero', value: 'superhero' },
    { name: 'Permadeath', value: 'permadeath' }
  ]

  constructor(private gamesServices:GamesService,
              private fb: FormBuilder) { 
                this.searchForm = this.fb.group({
                  platform: [''],
                  category: [''],
                  sortBy: [''],
                  tags: [''],
                  name: ['']
                });
              }

  ngOnInit(): void {
    this.getAllGames();
  }

  getAllGames() {
    const { platform, category, sortBy, tags, name } = this.searchForm.value;
    this.games$ = this.gamesServices.getGames(platform, category, sortBy, tags).pipe(
      map(games => {
        console.log(games)
        if (name) {
          // Filtrar juegos por nombre
          games = games.filter((game: { title: string; }) => 
            game.title.toLowerCase().includes(name.toLowerCase())
          );
        }
        // Dividir el arreglo de juegos en grupos de 10 elementos
        const pages = [];
        for (let i = 0; i < games.length; i += this.pageSize) {
          pages.push(games.slice(i, i + this.pageSize));
        }
        this.totalPages = pages.length;
        console.log(this.totalPages) // Guardar el número total de páginas
        return pages;
      })
    );

    this.paginatedGames$ = combineLatest([
      this.games$,
      this.currentPageSubject.asObservable(),
    ]).pipe(
      map(([pages, currentPage]) => {
        this.currentPage = currentPage; // Actualiza la página actual
        return pages[currentPage - 1] || [];
      }),
      takeUntil(this.destroy$)
    );
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPageSubject.next(page);
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateSearchParams(params: { platform?: string, category?: string, sortBy?: string, tags?: string }) {
    this.currentPageSubject.next(1); 
    this.getAllGames();
  }
  clearSearch(){
    this.searchForm.reset(
      {
        platform: '',
        category: '',
        sortBy: '',
        tags: '',
        name: ''
      }
    )
    this.currentPageSubject.next(1);
    this.getAllGames()
  }
}
