import dotenv from 'dotenv';
import initServer from './src/initializers/initServer';
import { config } from './src/config/index';

initServer(config).then(({ server }) => {
  server.listen(config.PORT);
});