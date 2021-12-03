export default class ViagemLotada extends Error {
    public name: string;
    constructor() {
        super('Não há assentos disponíveis nessa viagem');
        this.name = 'ViagemLotada';
    }
}