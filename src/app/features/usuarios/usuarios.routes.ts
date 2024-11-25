import { Routes } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuarioListComponent
  },
  {
    path: 'novo',
    component: UsuarioFormComponent
  },
  {
    path: ':id/editar',
    component: UsuarioFormComponent
  }
];