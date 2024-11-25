import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/master']); // Redireciona para a master-page se estiver logado
      return false; // Bloqueia o acesso à rota de login se estiver logado
    }
    return true; // Permite o acesso à rota de login se não estiver logado
  }
}