import CompanhiaNaoExiste from "../errors/CompanhiaNaoExiste";
import ViagemDataNaoExiste from "../errors/ViagemDataNaoExiste";
import ViagemLotada from "../errors/viagemLotada";
import ViagemNaoExiste from "../errors/ViagemNaoExiste";
import ViagemODNaoExiste from "../errors/ViagemODNaoExiste";
import { CompanhiaType } from "../types/CompanhiaType";
import { ViagemType } from "../types/ViagemType";
import { viagens } from "../services/viagemService";

export const companhias: CompanhiaType[] = [
    {
        id: 1, nome: 'Itampemirim', viagens: viagens.filter(viagem => viagem.ciaId === 1)
    },
    {
        id: 2, nome: 'Viação Cometa', viagens: viagens.filter(viagem => viagem.ciaId === 2)
    },
];

export default class CompanhiaService {
    constructor() { }

    buscarTodos() {
        return companhias;
    }
    buscarDadosPorId(id: number) {
        const companhia = companhias.find(c => c.id === id);
        if (!companhia) {
            throw new CompanhiaNaoExiste();
        }

        return companhia;
    }

    buscarDadosPorNome(nome: string) {
        const companhia = companhias.find(c => c.nome === nome);
        if (!companhia) {
            throw new CompanhiaNaoExiste();
        }

        return companhia;
    }
    buscarDadosPorOrigemDestino(origem?: string, destino?: string) {
        const companhia = companhias.find(c => c.viagens.map(
            (viagem) => viagem.origem === origem || viagem.destino === destino));
        if (!companhia) {
            throw new ViagemODNaoExiste();
        }

        return companhia;
    }
    buscarDadosPorIntervaloDatas(dataInicial: Date, dataFinal: Date) {
        const companhia = companhias.find(c => c.viagens.map(
            (viagem) => viagem.data > dataInicial && viagem.data < dataFinal));
        if (!companhia) {
            throw new ViagemDataNaoExiste();
        }

        return companhia;
    }
    reservarAssento(viagem: ViagemType) {

        if (viagem.numeroAssentos <= 0) {
            throw new ViagemLotada();
        } else {
            viagem.numeroAssentos--;
        }

        return viagem;
    }

}