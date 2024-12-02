import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-mensagem',
  template: `
    <div *ngIf="mensagem" class="mensagem {{ tipo }}">
      {{ mensagem }}
    </div>
  `,
  styles: [`
    .mensagem {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
    }

    .sucesso {
      background-color: #d4edda;
      border-color: #c3e6cb;
      color: #155724;
    }

    .erro {
      background-color: #f8d7da;
      border-color: #f5c6cb;
      color: #721c24;
    }
  `],
  imports: [CommonModule],
  standalone: true
})
export class MensagemComponent {
  @Input() mensagem: string | null = null;
  @Input() tipo: 'sucesso' | 'erro' = 'sucesso';
}