import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Importe aqui
import { routes } from './app/app.routes'; // Importe as rotas

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, HttpClientModule),
        provideRouter(routes) // Forneça as rotas aqui
    ]
});