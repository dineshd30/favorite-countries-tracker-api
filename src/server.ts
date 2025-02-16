import http from 'http';
import express from 'express';
import './config/logging';
import { SERVER } from './config/config';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { log } from 'console';

const app = express();
let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

const main = async () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(loggingHandler);
  app.use(corsHandler);

  app.get('/healthcheck', (req, res, next) => {
    res.status(200).json({ message: 'Server is running' }).end();
    return;
  });

  app.use(notFoundHandler);

  server = http.createServer(app);
  server.listen(SERVER.port, SERVER.host, () => {
    logging.info(`Server running on http://${SERVER.host}:${SERVER.port}`);
  });
}

export const closeServer = (callback: any) => {
  logging.info('Gracefully closing server');
  server && server.close(callback);
}

process.on('unhandledRejection', (error: Error) => {
  logging.error(error.message);
  closeServer(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  logging.warn('SIGTERM received');
  closeServer(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logging.warn('SIGINT received');
  closeServer(() => {
    process.exit(0);
  });
});

main();