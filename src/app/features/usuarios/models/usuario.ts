export interface Usuario {
    codUsuario: number;
    nomUsuario: string;
    nomEmail: string;
    senhaHash: string;
    datCriacao: Date;
    ultimoAcesso: Date;
    staAtivo: boolean;
  }