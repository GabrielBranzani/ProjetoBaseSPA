import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../model/Gerenciador/usuarios';
import { UsuarioService } from '../../../Services/usuario.service'; // Corrigido o caminho
import { MensagemComponent } from '../../../shared/mensagem.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './Usuario.component.html',
  styleUrls: ['./Usuario.component.css'],
  standalone: true,
  imports: [MensagemComponent, CommonModule, FormsModule]
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  usuarios: UsuarioModel[] = [];
  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obterUsuarios();
  }

  obterUsuarios() {
    this.usuarioService.obterUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (error) => {
        this.exibirMensagem('Erro ao obter usuários.', 'erro');
        console.error('Erro ao obter usuários:', error);
      }
    });
  }

  salvarUsuario() {
    if (this.usuario.codUsuario) {
      // Editar usuário existente
      this.usuarioService.atualizarUsuario(this.usuario).subscribe({
        next: () => {
          this.obterUsuarios();
          this.limparFormulario();
          this.exibirMensagem('Usuário atualizado com sucesso!', 'sucesso');
        },
        error: (error) => {
          this.exibirMensagem('Erro ao atualizar usuário.', 'erro');
          console.error('Erro ao atualizar usuário:', error);
        }
      });
    } else {
      // Criar novo usuário
      this.usuarioService.criarUsuario(this.usuario).subscribe({
        next: () => {
          this.obterUsuarios();
          this.limparFormulario();
          this.exibirMensagem('Usuário criado com sucesso!', 'sucesso');
        },
        error: (error) => {
          this.exibirMensagem('Erro ao criar usuário.', 'erro');
          console.error('Erro ao criar usuário:', error);
        }
      });
    }
  }

  editarUsuario(usuario: UsuarioModel) {
    this.usuario = { ...usuario };
  }

  desativarUsuario(codUsuario: number) {
    if (confirm('Tem certeza que deseja desativar este usuário?')) {
      this.usuarioService.desativarUsuario(codUsuario).subscribe({
        next: () => {
          this.obterUsuarios();
          this.exibirMensagem('Usuário desativado com sucesso!', 'sucesso');
        },
        error: (error) => {
          this.exibirMensagem('Erro ao desativar usuário.', 'erro');
          console.error('Erro ao desativar usuário:', error);
        }
      });
    }
  }

  limparFormulario() {
    this.usuario = new UsuarioModel();
  }

  exibirMensagem(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;
  }
}