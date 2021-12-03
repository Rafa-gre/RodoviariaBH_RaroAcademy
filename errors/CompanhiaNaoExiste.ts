export default class CompanhiaNaoExiste extends Error {
    public name: string;
    constructor() {
        super('A Companhia buscada não foi encontrada');
        this.name = 'CompanhiaNaoExiste';
    }
}