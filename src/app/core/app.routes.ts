import { Routes } from '@angular/router';
import { LoginComponent } from '../components/Gerenciador/Autenticacao/login/login.component';
import { BemVindoComponent } from '../components/Gerenciador/bem-vindo/bem-vindo.component';
import { UsuarioComponent } from '../components/Gerenciador/Usuario/Usuario.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { MasterLayoutComponent } from '../layouts/master-layout/master-layout.component';
import { AuthGuard } from '../core/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'login', 
        component: LoginComponent 
      }
    ]
  },
  {
    path: '',
    component: MasterLayoutComponent,
    canActivate: [AuthGuard], // Protege as rotas filhas com o AuthGuard
    children: [
      { 
        path: 'bem-vindo', 
        component: BemVindoComponent 
      },
      { 
        path: 'usuario', 
        component: UsuarioComponent 
      }
    ]
  }
];