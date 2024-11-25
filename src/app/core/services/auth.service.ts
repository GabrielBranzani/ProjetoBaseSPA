import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import jwt_decode, { jwtDecode } from 'jwt-decode'; // Importe a biblioteca
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5275/api/auth'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap(response => this.saveTokens(response)),
      catchError(error => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => new Error('Usuário ou senha inválidos.'));
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/logout`, { refreshToken }).pipe(
      finalize(() => this.clearTokens()), // Usar finalize() aqui
      catchError(error => {
        console.error('Erro ao fazer logout:', error);
        return throwError(() => new Error('Erro ao fazer logout.'));
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap(response => this.saveTokens(response)),
      catchError(error => {
        console.error('Erro ao renovar token:', error);
        return throwError(() => new Error('Erro ao renovar token.'));
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isLoggedIn(): boolean {
    const isLogado = this.getAccessToken() !== null;
    console.log(`Esta logado? ${isLogado ? 'Sim' : 'Não'}`);
    return isLogado;
  }

  private saveTokens(response: LoginResponse): void {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
  
    // Decodificar o token JWT para obter as informações do usuário
    const decodedToken = jwtDecode(response.accessToken); // Importe a biblioteca jwt-decode
    localStorage.setItem('user', JSON.stringify(decodedToken)); // Salvar o usuário no localStorage
  }

  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getCodUsuarioLogado(): number | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr) as User;
      return user.codUsuario;
    }
    return null;
  }
}