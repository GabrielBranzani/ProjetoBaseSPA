import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule] // Remova ActivatedRoute daqui
})
export class AppComponent {
  title = 'ProjetoBaseSPA';

  constructor(private activatedRoute: ActivatedRoute) { } // Injete o ActivatedRoute aqui
}