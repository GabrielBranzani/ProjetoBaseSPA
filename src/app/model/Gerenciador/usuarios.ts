export class UsuarioModel {
    codUsuario: number = 0;
    nomUsuario: string = '';
    numCPF: string = '';
    SenhaHash: string = '';
    datCriacao: Date = new Date();
    staAtivo: boolean = true;
  }