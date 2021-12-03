import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import TokenPayload from '../types/TokenPayload';
import RequestWithUserData from '../types/RequestWithUserData';
import UsuarioService from '../services/usuarioService';
import UsuarioNaoExiste from '../errors/UsuarioNaoExiste';
import { UsuarioType } from '../types/UsuarioType';
import { usuarios as usuariosRepo } from '../services/usuarioService';

const usuarios: UsuarioType[] = usuariosRepo;

export const autenticar = (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email);

  if (usuario?.senha === senha) {
    const { perfil, nome, id, email } = usuario;
    const payload: TokenPayload = {
      perfil,
      nome,
      id,
      email
    };
    const token = sign(payload, process.env.AUTH_SECRET);
    res.send({ token });
  } else {
    res.status(422).send("usuario ou senha não encontrados");
  }

};


export const listar = (req: RequestWithUserData, res: Response) => {
  console.log('....', req.usuario);
  const nome = req.query.nome as string;
  if (nome) {
    const filteredUsuarios = usuarios.filter(u => u.nome.match(new RegExp(nome, 'i')));
    return res.send(filteredUsuarios)
  }
  const usuariosSemSenha = usuarios.map((usuario) => {
    const { id, nome, email, perfil, companhia } = usuario;
    return { id, nome, email, perfil, companhia };
  })

  res.send(usuariosSemSenha);
};

export const buscar = (req: Request, res: Response) => {
  const { id } = req.params;
  return buscarUsuarioPorId(req, res, Number(id));
};

export const buscarMeusDados = (req: RequestWithUserData, res: Response) => {
  const { usuario: tokenPayload } = req;
  const id = tokenPayload.id;
  buscarUsuarioPorId(req, res, Number(id));
};

export const criar = (req: Request, res: Response) => {
  const usuario = req.body;
  usuarios.push(usuario);

  res.status(201).send(usuario);
};

export const criarFuncionario = (req: RequestWithUserData, res: Response) => {
  const usuarioAuth = req.usuario;
  const usuario = req.body;
  if (usuarioAuth.perfil === 'Funcionario' && usuarioAuth.companhia === usuario.companhia) {
    usuarios.push(usuario);
    res.status(201).send(usuario);
  } else {
    return res.status(403).send('Forbidden');
  };
};

export const criarPassageiro = (req: RequestWithUserData, res: Response) => {
  const usuarioAuth = req.usuario;
  const usuario = req.body;
  if (usuarioAuth.perfil === 'Passageiro') {
    usuarios.push(usuario);
    res.status(201).send(usuario);
  } else {
    return res.status(403).send('Forbidden');
  }
}


export const atualizar = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const usuario = req.body;
  const index = usuarios.findIndex(u => u.id === id);

  if (index < 0) {
    res.status(404).send();
  }

  usuarios[index] = { ...usuario, id };
  res.send(usuarios[index]);
};

export const deletar = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  usuarios.splice(index, 1);
  res.status(204).send('ok');
};

const buscarUsuarioPorId = (req: Request, res: Response, id: number) => {
  const usuarioService = new UsuarioService();
  try {
    const usuario = usuarioService.buscarMeusDadosPorId(id);
    const { perfil, nome, email, companhia } = usuario;
    const usuarioSemSenha = { id, nome, email, perfil, companhia };
    res.send(usuarioSemSenha);
  } catch (error) {
    if (error instanceof UsuarioNaoExiste) {
      return res.status(404).send();
    }
  }
};
