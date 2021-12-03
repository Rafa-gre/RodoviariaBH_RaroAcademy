import { Router } from 'express';
import * as companhiaController from '../controllers/companhiaController';
import * as viagemController from '../controllers/viagemController';
import { adminAuth, funcionarioCiaAuth } from '../middlewares/profile';
const router = Router();


router.get('/', companhiaController.listar);
router.get('/:id', companhiaController.buscar);
router.post('/', adminAuth, companhiaController.criar);
router.patch('/:id', adminAuth, companhiaController.atualizar);
router.delete('/:id', adminAuth, companhiaController.deletar);

// rotas viagens

/* router.get('/:id/viagens/', viagemController.listar);
router.get('/:id/viagens/buscaOD', viagemController.buscarViagemPorOrigemDestino);
router.get('/:id/viagens/:viagemId', viagemController.buscar);
router.post('/:id/viagens/buscaDatas/', viagemController.buscarViagemPorIntervaloDatas);
router.post('/:id/viagens/', funcionarioCiaAuth, viagemController.criar)
router.post('/:id/viagens/:viagemId/reservar', viagemController.reservarAssento);;
router.patch('/:id/viagens/:viagemId', funcionarioCiaAuth, viagemController.atualizar);
router.delete('/:id/viagens/:viagemId', funcionarioCiaAuth, viagemController.deletar); */



export default router;