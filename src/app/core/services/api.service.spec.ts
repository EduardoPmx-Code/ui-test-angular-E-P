import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request and return data', () => {
    const mockData = { data: 'test data' };
    const testPath = '/test';
    const testParams = new HttpParams().set('param1', 'value1');

    service.get(testPath, testParams).subscribe((res) => {
      expect(res).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.api_url}${testPath}?param1=value1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simula una respuesta exitosa
  });

  it('should handle an error response', () => {
    const testPath = '/test';
    const errorMessage = { error: 'test error' };

    service.get(testPath).subscribe({
      next: () => fail('should have failed with the error response'),
      error: (error) => {
        expect(error).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.api_url}${testPath}`);
    expect(req.request.method).toBe('GET');
    
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' }); // Simula una respuesta con error
  });
});
