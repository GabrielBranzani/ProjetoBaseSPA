import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';   
import { LoginRequest } from '../../core/models/login-request';
import { FormsModule } from '@angular/forms'; // Importe aqui

@Component({
  selector: 'app-login',
  standalone: true, // Certifique-se que esta linha está presente
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule] // Adicione aqui
})
export class LoginComponent {
  loginRequest: LoginRequest = { nomEmail: '', senhaHash: '' };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.loginRequest).subscribe(
      () => {
        // Redirecionar para a master-page após o login
        this.router.navigate(['/master']); // Redireciona para a rota da master-page
      },
      (error) => {
        // Exibir mensagem de erro para o usuário
        alert(error.message);
      }
    );
  }
}