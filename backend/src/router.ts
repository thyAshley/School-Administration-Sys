import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';

const router = Express.Router();

router.use('/', HealthcheckController);

export default router;
