import UsuarioNaoExiste from "../errors/UsuarioNaoExiste";
import UsuarioPerfilNaoExiste from "../errors/UsuarioPerfilNaoExiste";
import { UsuarioType } from "../types/UsuarioType";

export const usuarios: UsuarioType[] = [
  { id: 1, senha: 'coleta@raroacademy', perfil: 'Admin', email: 'coleta@rarolabs.com.br', nome: 'Paulo Coleta', companhia: "Admin" },
  { id: 2, senha: 'phil@raroacademy', perfil: 'Funcionario', email: 'phil@rarolabs.com.br', nome: 'Phil', companhia: "Cometa" },
  { id: 3, senha: 'paulo@raroacademy', perfil: 'Passageiro', email: 'paulo@rarolabs.com.br', nome: 'Paulo', companhia: "Passageiro" },
];

export default class UsuarioService {
  constructor() { }

  buscarMeusDadosPorId(id: number) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return usuario;
  }

  buscarMeusDadosPorPerfil(perfil: string) {
    const usuario = usuarios.filter(u => u.perfil === perfil);
    if (!usuario) {
      throw new UsuarioPerfilNaoExiste();
    }

    return usuario;
  }

  CriarUsuario(usuario: UsuarioType) {
    if (usuario.perfil === "Admin") {
      usuario.companhia = "Admin";
    }
    if (usuario.perfil === "Passageiro") {
      usuario.companhia = "Passageiro";
    }
    usuarios.push(usuario);

  }
}