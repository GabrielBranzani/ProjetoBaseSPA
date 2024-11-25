import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // Certifique-se que esta linha está presente
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/auth']);
      },
      (error) => {
        console.error('Erro ao fazer logout:', error);
      }
    );
  }
}