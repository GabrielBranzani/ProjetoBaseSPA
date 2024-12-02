import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.component.html',
  styleUrls: ['./bem-vindo.component.css'],
  standalone: true
})
export class BemVindoComponent implements OnInit {

  nomeUsuario: string | null = null;
  cpfUsuario: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.nomeUsuario = this.authService.getNumCPF(); // Usamos getNumCPF para obter o nome
    this.cpfUsuario = this.authService.getNumCPF();
  }
}