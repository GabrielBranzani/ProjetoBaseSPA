import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:5275/api/usuarios'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(codUsuario: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${codUsuario}`;
    return this.http.get<Usuario>(url);
  }

  criarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  atualizarUsuario(usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}/${usuario.codUsuario}`;
    return this.http.put(url, usuario);
  }

  desativarUsuario(codUsuario: number): Observable<any> {
    const url = `${this.apiUrl}/${codUsuario}`;
    return this.http.delete(url);
  }
}