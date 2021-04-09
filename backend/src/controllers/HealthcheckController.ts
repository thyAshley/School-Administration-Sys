import Express, { RequestHandler } from 'express';
import { OK } from 'http-status-codes';

const HealthcheckController = Express.Router();

const healthcheckHandler: RequestHandler = async (req, res) => {
  return res.sendStatus(OK);
}

HealthcheckController.get('/healthcheck', healthcheckHandler);

export default HealthcheckController;
