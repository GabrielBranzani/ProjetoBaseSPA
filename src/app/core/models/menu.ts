export interface Menu {
    codGrupoUsuario: number;
    nomGrupoUsuario: string;
    codModulo: number;
    nomModulo: string;
    moduloIcone: string; // Adicionado
    ordemModulo: number;
    codMenu: number;
    nomMenu: string;
    menuIcone: string; // Adicionado
    ordemMenu: number;
    codFormulario: number;
    nomFormulario: string;
    formularioRota: string; // Adicionado
    formularioIcone: string; // Adicionado
    ordemFormulario: number;
    codPermissao: number;
    consultar: boolean;
    adicionar: boolean;
    editar: boolean;
    excluir: boolean;
  }