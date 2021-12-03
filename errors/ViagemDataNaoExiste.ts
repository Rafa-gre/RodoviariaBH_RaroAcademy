export default class ViagemDataNaoExiste extends Error {
    public name: string;
    constructor() {
        super('Não há nenhuma viagem nesse intervalo de Data');
        this.name = 'ViagemDataNaoExiste';
    }
}