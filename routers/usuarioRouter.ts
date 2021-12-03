import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { authenticationMiddleware } from '../middlewares/authentication';
import { adminAuth, funcionarioCiaAuth, passageiroAuth } from '../middlewares/profile';
const router = Router();

// rota aberta para todos.
router.post('/usuarios/signin', usuarioController.autenticar);
router.post('/usuarios/criarPassageiro', passageiroAuth, usuarioController.criarPassageiro);
// rotas fechadas
router.get('/usuarios/me', authenticationMiddleware, usuarioController.buscarMeusDados);
router.get('/usuarios', authenticationMiddleware, adminAuth, usuarioController.listar);
router.get('/usuarios/:id', authenticationMiddleware, adminAuth, usuarioController.buscar);
router.post('/usuarios', authenticationMiddleware, adminAuth, usuarioController.criar);
router.post('/usuarios/criarFuncionario', authenticationMiddleware, funcionarioCiaAuth, usuarioController.criarFuncionario);
router.patch('/usuarios/:id', authenticationMiddleware, adminAuth, usuarioController.atualizar);
router.delete('/usuarios/:id', authenticationMiddleware, adminAuth, usuarioController.deletar);

export default router;