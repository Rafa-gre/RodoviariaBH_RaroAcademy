export default class ViagemODNaoExiste extends Error {
    public name: string;
    constructor() {
        super('Não existe viagem na companhia selecionada');
        this.name = 'ViagemCiaNaoExiste';
    }
}