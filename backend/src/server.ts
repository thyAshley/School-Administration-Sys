import 'dotenv/config';
import sequelize from './config/database';
import Logger from './config/logger';
import App from './app';

const MAX_RETRY = 20;
const LOG = new Logger('server.ts');
const { PORT = 3000 } = process.env;

const startApplication = async (retryCount: number) => {
  try {
    await sequelize.authenticate();
    App.listen(PORT, () => {
      LOG.info(`Application started at http://localhost:${PORT}`);
    });

  } catch (e) {
    LOG.error(e);

    const nextRetryCount = retryCount - 1;
    if (nextRetryCount > 0) {
      setTimeout(async () => await startApplication(nextRetryCount), 3000);
      return;
    }

    LOG.error('Unable to start application');
  }
};

startApplication(MAX_RETRY);
