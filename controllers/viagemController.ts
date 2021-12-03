import { Request, Response } from 'express';
import CompanhiaNaoExiste from '../errors/CompanhiaNaoExiste';
import ViagemDataNaoExiste from '../errors/ViagemDataNaoExiste';
import ViagemODNaoExiste from '../errors/ViagemNaoExiste';
import ViagemNaoExiste from '../errors/ViagemNaoExiste';
import CompanhiaService, { companhias } from '../services/companhiaService';
import ViagemService from '../services/viagemService';
import { ViagemType } from "../types/ViagemType";
import { viagens as viagensRepo } from '../services/viagemService';
import RequestWithUserData from '../types/RequestWithUserData';

const viagens: ViagemType[] = viagensRepo



export const buscar = (req: Request, res: Response) => {
    const { id, viagemId } = req.params;
    const companhiaService = new CompanhiaService();
    try {
        const companhia = companhiaService.buscarDadosPorId(Number(id));
        const viagemCia = companhia.viagens.filter(viagem => viagem.id === Number(viagemId));
        if (viagemCia.length === 0) {
            throw new ViagemNaoExiste();
        } else {
            res.send(viagemCia);
        }
    } catch (error) {
        if (error instanceof ViagemNaoExiste) {
            return res.status(404).send(error.message);
        }
    }
};

export const listar = (req: Request, res: Response) => {

    const { id } = req.params;
    buscarViagemPorCia(req, res, Number(id));

};

export const criar = (req: RequestWithUserData, res: Response) => {
    const usuarioAuth = req.usuario;
    const viagem = req.body;
    const companhia = companhias.find(comp => comp.id === viagem.ciaId);
    if (usuarioAuth.companhia === companhia.nome) {
        console.log(viagem);
        viagens.push(viagem);
        return res.status(201).send(viagem);
    } else {
        return res.status(403).send("Usuario nao autorizado");
    }

};

export const buscarViagemPorId = (req: Request, res: Response, id: number) => {
    const viagemService = new ViagemService();
    try {
        const viagem = viagemService.buscarViagemPorId(id);
        res.send(viagem);
    } catch (error) {
        if (error instanceof ViagemNaoExiste) {
            return res.status(404).send();
        }
    }
};
export const buscarViagemPorOrigemDestino = (req: Request, res: Response) => {
    const { origem, destino } = req.query;
    console.log(origem, destino);
    const viagemService = new ViagemService();
    if (!origem || !destino) {
        const erro = "É preciso inserir uma origem ou um destino "
        return res.status(406).send(erro);
    }
    try {
        const viagem = viagemService.buscarDadosPorOrigemDestino(origem.toString(), destino.toString());
        res.send(viagem);
    } catch (error) {
        if (error instanceof ViagemODNaoExiste) {
            return res.status(404).send(error.message);
        }
    }
};

export const buscarViagemPorIntervaloDatas = (req: Request, res: Response) => {
    const { dataInicial, dataFinal } = req.body;
    const viagemService = new ViagemService();
    try {
        const viagem = viagemService.buscarDadosPorIntervaloDatas(new Date(dataInicial), new Date(dataFinal));
        res.send(viagem);
    } catch (error) {
        if (error instanceof ViagemDataNaoExiste) {
            return res.status(404).send(error.message);
        }
    }
};
export const buscarViagemPorCia = (req: Request, res: Response, id: number) => {
    const companhiaService = new CompanhiaService();
    try {
        const companhia = companhiaService.buscarDadosPorId(id);
        res.send(companhia.viagens);
    } catch (error) {
        if (error instanceof CompanhiaNaoExiste) {
            return res.status(404).send(error.message);
        }
    }
};
export const atualizar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const viagem = req.body;
    const index = viagens.findIndex(u => u.id === id);

    if (index < 0) {
        res.status(404).send();
    }

    viagens[index] = { ...viagem, id };
    res.send(viagens[index]);
};
export const deletar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = viagens.findIndex(u => u.id === id);
    viagens.splice(index, 1);
    res.status(204).send('ok');
};
export const reservarAssento = (req: Request, res: Response) => {
    const { viagemId } = req.params;
    const viagemService = new ViagemService();
    const viagem = viagemService.buscarViagemPorId(Number(viagemId));
    if (viagem.numeroAssentos > 0) {
        viagemService.reservarAssento(viagem);
        const mensagem = "Assento reservado com sucesso";
        res.status(201).send(mensagem);
    } else {
        const mensagem = "Não existem assentos disponíveis";
        res.status(406).send(mensagem);
    }
};
