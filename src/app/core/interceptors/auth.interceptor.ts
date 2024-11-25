import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor - intercept: Requisição interceptada.', request); // Log da requisição
    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken()!);
    }

    return next.handle(request).pipe(
      catchError(error => {
        console.log('AuthInterceptor - catchError: Erro 401 recebido.', error); // Log do erro 401
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      // Log: Iniciando processo de refresh token
      console.log('AuthInterceptor - handle401Error: Iniciando processo de refresh token.');
  
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
  
          // Log: Refresh token concluído com sucesso
          console.log('AuthInterceptor - handle401Error: Refresh token concluído com sucesso.');
  
          return next.handle(this.addToken(request, token.accessToken));
        }),
        catchError(error => {
          // Log: Erro ao renovar o token
          console.error('AuthInterceptor - handle401Error: Erro ao renovar o token:', error);
  
          this.isRefreshing = false;
          // Redirecionar para a página de login ou realizar outra ação em caso de erro
          this.router.navigate(['/auth/login']); // Importe o Router e injete no construtor
          return throwError(() => error);
        })
      );
    } else {
      // Log: Aguardando refresh token de outra requisição
      console.log('AuthInterceptor - handle401Error: Aguardando refresh token de outra requisição.');
  
      return this.refreshTokenSubject.pipe(
        // ...
      );
    }
  }
}