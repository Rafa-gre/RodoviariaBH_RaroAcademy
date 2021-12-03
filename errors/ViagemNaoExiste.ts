export default class ViagemODNaoExiste extends Error {
    public name: string;
    constructor() {
        super('Não existe viagem com o ID informado');
        this.name = 'ViagemNaoExiste';
    }
}