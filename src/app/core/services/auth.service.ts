import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { User } from '../models/user';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import jwt_decode, { jwtDecode } from 'jwt-decode';

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
      finalize(() => this.clearTokens()),
      catchError(error => {
        console.error('Erro ao fazer logout:', error);
        return throwError(() => new Error('Erro ao fazer logout.'));
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.http.post<LoginResponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
        tap(response => this.saveTokens(response)),
        catchError(error => {
          console.error('Erro ao renovar token:', error);
          return throwError(() => new Error('Erro ao renovar token.'));
        })
      );
    } else {
      return throwError(() => new Error('Refresh token não encontrado.'));
    }
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('refresh_token='))
      ?.split('=')[1];
    return cookieValue ?? null; // Retorna null se cookieValue for undefined
  }

  isLoggedIn(): boolean {
    const isLogado = this.getAccessToken() !== null;
    console.log(`Esta logado? ${isLogado ? 'Sim' : 'Não'}`);
    return isLogado;
  }

  private saveTokens(response: LoginResponse): void {
    sessionStorage.setItem('access_token', response.accessToken);

    // Define o cookie com httpOnly e SameSite=Strict
    document.cookie = `refresh_token=${response.refreshToken}; HttpOnly; SameSite=Strict; path=/`;

    // Decodificar o token JWT para obter as informações do usuário
    const decodedToken = jwtDecode(response.accessToken); // Correto
    sessionStorage.setItem('user', JSON.stringify(decodedToken)); // Salvar o usuário no sessionStorage
  }

  private clearTokens(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');

    // Remove o cookie refreshToken
    document.cookie = 'refresh_token=; HttpOnly; SameSite=Strict; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  getCodUsuarioLogado(): number | null {
    const userStr = sessionStorage.getItem('user'); // Busca no sessionStorage
    if (userStr) {
      const user = JSON.parse(userStr) as User;
      return user.codUsuario;
    }
    return null;
  }
}