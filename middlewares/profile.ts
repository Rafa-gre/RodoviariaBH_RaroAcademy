import { Response, NextFunction } from "express";
import RequestWithUserData from "../types/RequestWithUserData";


export const adminAuth = (req: RequestWithUserData, res: Response, next: NextFunction) => {
    const { usuario } = req;

    if (usuario.perfil !== 'Admin') {
        return res.status(403).send('Forbidden');
    }

    next();
}

export const funcionarioCiaAuth = (req: RequestWithUserData, res: Response, next: NextFunction) => {
    const { usuario } = req;

    if (usuario.perfil !== 'Funcionario') {
        return res.status(403).send('Forbidden');
    }

    next();
}

export const passageiroAuth = (req: RequestWithUserData, res: Response, next: NextFunction) => {
    const { usuario } = req;

    if (usuario.perfil !== 'Admin') {
        return res.status(403).send('Forbidden');
    }

    next();
}