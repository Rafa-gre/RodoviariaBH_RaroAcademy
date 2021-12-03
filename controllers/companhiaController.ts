
import { Request, Response } from 'express';
import CompanhiaNaoExiste from '../errors/CompanhiaNaoExiste';
import CompanhiaService from '../services/companhiaService';
import { CompanhiaType } from '../types/CompanhiaType';
import { companhias as companhiasRepo } from '../services/companhiaService';


const companhias: CompanhiaType[] = companhiasRepo;


export const listar = (req: Request, res: Response) => {

    const nome = req.query.nome as string;
    if (nome) {
        const filteredCompanhias = companhias.filter(u => u.nome.match(new RegExp(nome, 'i')));
        return res.send(filteredCompanhias);
    }

    res.send(companhias);
};

export const buscar = (req: Request, res: Response) => {
    const { id } = req.params;
    buscarCompanhiaPorId(req, res, Number(id));
};
export const criar = (req: Request, res: Response) => {

    const companhia = req.body;
    console.log(companhia);
    companhias.push(companhia);

    res.status(201).send(companhia);
};

export const atualizar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const companhia = req.body;
    const index = companhias.findIndex(u => u.id === id);

    if (index < 0) {
        res.status(404).send();
    }

    companhias[index] = { ...companhia, id };
    res.send(companhias[index]);
};
export const deletar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = companhias.findIndex(u => u.id === id);
    companhias.splice(index, 1);
    res.status(204).send('ok');
};
export const buscarCompanhiaPorId = (req: Request, res: Response, id: number) => {
    const companhiaService = new CompanhiaService();
    try {
        const companhia = companhiaService.buscarDadosPorId(id);
        res.send(companhia);
    } catch (error) {
        if (error instanceof CompanhiaNaoExiste) {
            return res.status(404).send(error.message);
        }
    }
};

