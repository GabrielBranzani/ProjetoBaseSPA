import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [() => { console.log('Carregando LoginComponent'); return true; }] // Adicione esta linha
    }
];