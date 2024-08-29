import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private apiService:ApiService) { }

  getGames(
    platform?: string,
    category?: string,
    sortBy?: string,
    tags?: string
  ):Observable<any>{
    let url = '/games';
    const params: string[] = [];

    if (platform) {
      params.push(`platform=${platform}`);
    }

    if (category) {
      params.push(`category=${category}`);
    }

    if (sortBy) {
      params.push(`sort-by=${sortBy}`);
    }

    if (tags) {
      params.push(`tag=${tags}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return this.apiService.get(url);
  }

  getGameById(id:string):Observable<any>{
    return this.apiService.get(`/game?id=${id}`)
  }
}
