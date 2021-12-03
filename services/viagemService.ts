import ViagemCiaNaoExiste from "../errors/ViagemCiaNaoExiste";
import ViagemDataNaoExiste from "../errors/ViagemDataNaoExiste";
import ViagemLotada from "../errors/viagemLotada";
import ViagemNaoExiste from "../errors/ViagemNaoExiste";
import ViagemODNaoExiste from "../errors/ViagemODNaoExiste";
import { ViagemType } from "../types/ViagemType";



export const viagens: ViagemType[] = [
    {
        id: 1,
        origem: "Belo Horizonte",
        destino: "São Paulo",
        data: new Date(2021, 12, 1, 8, 0, 0, 0),
        numeroAssentos: 0,
        ciaId: 1,
    },
    {
        id: 2,
        origem: "Rio de Janeiro",
        destino: "Belo Horizonte",
        data: new Date(2021, 12, 2, 19, 0, 0, 0),
        numeroAssentos: 40,
        ciaId: 1,
    },
    {
        id: 3,
        origem: "Belo Horizonte",
        destino: "Rio de Janeiro",
        data: new Date(2021, 12, 4, 14, 0, 0, 0),
        numeroAssentos: 40,
        ciaId: 2,
    },
    {
        id: 4,
        origem: "Belo Horizonte",
        destino: "Brasilia",
        data: new Date(2021, 12, 5, 6, 0, 0, 0),
        numeroAssentos: 40,
        ciaId: 2,
    }
];

export default class ViagemService {
    constructor() { }

    buscarTodos() {
        return viagens;
    }
    buscarViagemPorId(id: number) {
        const viagem = viagens.find(v => v.id === id);
        if (!viagem) {
            throw new ViagemNaoExiste();
        }

        return viagem;
    }

    buscarDadosPorCia(ciaId: number) {
        const viagem = viagens.filter(v => v.ciaId === ciaId);
        if (!viagem) {
            throw new ViagemCiaNaoExiste();
        }

        return viagem;
    }
    buscarDadosPorOrigemDestino(origem?: string, destino?: string) {
        const viagem = viagens.filter((viagem) => viagem.origem === origem && viagem.destino === destino);
        if (!viagem) {
            throw new ViagemODNaoExiste();
        }

        return viagem;
    }
    buscarDadosPorIntervaloDatas(dataInicial: Date, dataFinal: Date) {
        const viagem = viagens.filter((viagem) => {
            return viagem.data >= dataInicial && viagem.data <= dataFinal;

        });
        if (viagem.length === 0) {
            throw new ViagemDataNaoExiste();
        }

        return viagem;
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