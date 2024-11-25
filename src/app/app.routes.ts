import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MasterPageComponent } from './core/components/master-page/master-page.component';
import { LoggedInGuard } from './core/guards/logged-in.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routes),
    canActivate: [LoggedInGuard] // Mantém apenas esta rota /auth
  },
  {
    path: 'usuarios',
    component: MasterPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/usuarios/usuarios.routes').then(m => m.routes)
      },
      {
        path: 'master',
        component: MasterPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'grupos',
    loadChildren: () => import('./features/grupos.module').then(m => m.GruposModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modulos',
    loadChildren: () => import('./features/modulos.module').then(m => m.ModulosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menus',
    loadChildren: () => import('./features/menus.module').then(m => m.MenusModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'formularios',
    loadChildren: () => import('./features/formularios.module').then(m => m.FormulariosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'permissoes',
    loadChildren: () => import('./features/permissoes.module').then(m => m.PermissoesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'master',
    component: MasterPageComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: '/auth',  // Redireciona para /auth/login
    pathMatch: 'full' 
  },
];