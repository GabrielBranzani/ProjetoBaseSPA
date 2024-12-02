import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { RouterModule } from '@angular/router'; // Importe o RouterModule

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css'],
  imports: [RouterOutlet, RouterModule],
  standalone: true
})
export class MasterLayoutComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}