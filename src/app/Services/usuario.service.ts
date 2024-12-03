import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../model/Gerenciador/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly apiUrl = 'http://localhost:5275/api/usuario'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  obterUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.apiUrl);
  }

  criarUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(this.apiUrl, usuario);
  }

  atualizarUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(
      `${this.apiUrl}/${usuario.codUsuario}`,
      usuario
    );
  }

  desativarUsuario(codUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${codUsuario}`);
  }
}
