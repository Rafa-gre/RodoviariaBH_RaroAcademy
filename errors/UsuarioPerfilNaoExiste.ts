export default class UsuarioPerfilNaoExiste extends Error {
    public name: string;
    constructor() {
        super('Perfil Não Encontrado');
        this.name = 'UsuarioPerfilNaoExiste';
    }
}