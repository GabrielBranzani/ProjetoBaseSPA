import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, map, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'; // Adicione esta linha

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // 1. Verificar se o usuário está autenticado
    if (this.authService.isAuthenticated()) {
      // 2. Verificar se o token está perto de expirar
      const tokenExpiration = this.getTokenExpirationDate();
      if (
        tokenExpiration &&
        tokenExpiration < this.addMinutesToDate(new Date(), 1)
      ) {
        // Renova 1 minuto antes de expirar
        // 3. Renovar o token
        return this.authService.renovarToken().pipe(
          switchMap(() => {
            // 4. Verificar se a renovação foi bem-sucedida
            if (this.authService.isAuthenticated()) {
              return of(true); // Permite acesso à rota
            } else {
              this.router.navigate(['/login']); // Redireciona para o login
              return of(false);
            }
          })
        );
      } else {
        return of(true); // Permite acesso à rota
      }
    } else {
      this.router.navigate(['/login']); // Redireciona para o login
      return of(false);
    }
  }

  private getTokenExpirationDate(): Date | null {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = new JwtHelperService().decodeToken(token);
      if (decodedToken.exp) {
        return new Date(decodedToken.exp * 1000);
      }
    }
    return null;
  }

  private addMinutesToDate(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
}
