import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { RouterModule } from '@angular/router';
import { Menu } from '../../models/menu';
import { AuthService } from '../../services/auth.service'; // Importe o AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Certifique-se que esta linha está presente
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterModule, CommonModule] // Adicione aqui
})
export class SidebarComponent implements OnInit {
  menus: Menu[] = [];

  constructor(private menuService: MenuService, private authService: AuthService) { } // Injete o AuthService

  ngOnInit(): void {
    this.carregarMenus();
  }

  carregarMenus(): void {
    const codUsuario = this.authService.getCodUsuarioLogado(); // Obtenha o código do usuário
    if (codUsuario) {
      this.menuService.getMenus(codUsuario).subscribe(
        (menus: Menu[]) => {
          this.menus = menus;
        },
        (error: any) => {
          console.error('Erro ao carregar menus:', error);
        }
      );
    }
  }
}