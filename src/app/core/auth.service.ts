import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { UsuarioLoginDto } from '../model/Gerenciador/usuarioLoginDto'; // Corrigido o caminho
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5275/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.loadTokenFromStorage();
  }

  login(usuario: UsuarioLoginDto): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, usuario, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
        }),
        catchError((error) => {
          console.error('Erro ao fazer login:', error);
          return throwError(() => error);
        })
      );
  }

  renovarToken(): Observable<LoginResponse> {
    console.log('renovarToken executado');
    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/renovar-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.saveToken(response.token);
          console.log('renovarToken salvo novo');
        }),
        catchError((error) => {
          console.error('Erro ao renovar token:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  private loadTokenFromStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCodUsuario(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.nameid ? parseInt(decodedToken.nameid, 10) : null;
    }
    return null;
  }

  getNumCPF(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.unique_name;
    }
    return null;
  }
}
