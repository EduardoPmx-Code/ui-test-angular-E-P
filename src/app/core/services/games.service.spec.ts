import { TestBed } from '@angular/core/testing';
import { GamesService } from './games.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('GamesService', () => {
  let service: GamesService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        GamesService,
        { provide: ApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(GamesService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getGames', () => {
    it('should call ApiService.get with correct URL when no parameters are provided', () => {
      const mockResponse = { data: 'test data' };
      apiServiceSpy.get.and.returnValue(of(mockResponse));

      service.getGames().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      expect(apiServiceSpy.get).toHaveBeenCalledWith('/games');
    });

    it('should call ApiService.get with correct URL when all parameters are provided', () => {
      const mockResponse = { data: 'test data' };
      const platform = 'pc';
      const category = 'mmo';
      const sortBy = 'popularity';
      const tags = 'action';
      apiServiceSpy.get.and.returnValue(of(mockResponse));

      service.getGames(platform, category, sortBy, tags).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const expectedUrl = '/games?platform=pc&category=mmo&sort-by=popularity&tag=action';
      expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('#getGameById', () => {
    it('should call ApiService.get with correct URL', () => {
      const mockResponse = { data: 'game data' };
      const gameId = '123';
      apiServiceSpy.get.and.returnValue(of(mockResponse));

      service.getGameById(gameId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const expectedUrl = `/game?id=${gameId}`;
      expect(apiServiceSpy.get).toHaveBeenCalledWith(expectedUrl);
    });
  });
});
