import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly apiUrl = 'http://localhost:5275/api/menuusuario'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getMenus(codUsuario: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/${codUsuario}`);
  }
}