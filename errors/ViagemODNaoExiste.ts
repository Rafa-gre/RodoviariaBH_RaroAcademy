export default class ViagemODNaoExiste extends Error {
    public name: string;
    constructor() {
        super('Não há nenhuma viagem com essa origem/destino');
        this.name = 'ViagemODNaoExiste';
    }
}