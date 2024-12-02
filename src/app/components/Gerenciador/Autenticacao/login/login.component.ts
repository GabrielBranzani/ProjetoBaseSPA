import { Component, OnInit } from '@angular/core'; // Importe OnInit
import { UsuarioLoginDto } from '../../../../model/Gerenciador/usuarioLoginDto';
import { AuthService } from '../../../../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class LoginComponent implements OnInit { // Implemente a interface OnInit

  usuario: UsuarioLoginDto = new UsuarioLoginDto();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { // Adicione o método ngOnInit
    // Verifica se o usuário já está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/bem-vindo']); // Redireciona para a página inicial
    }
  }

  onSubmit() {
    this.authService.login(this.usuario).subscribe({
      next: () => {
        this.router.navigate(['/bem-vindo']);
      },
      error: (error) => {
        console.error('Erro ao fazer login:', error);
      }
    });
  }
}