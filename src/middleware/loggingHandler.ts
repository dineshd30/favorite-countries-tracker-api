import { Request, Response, NextFunction } from 'express';

export const loggingHandler = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Request - METHOD:[${req.method}] URL:[${req.url}] IP:[${req.socket.remoteAddress}] PORT:[${req.socket.remotePort}]`);
  res.on('finish', () => {
    logging.info(`Response - STATUS:[${res.statusCode}] METHOD:[${req.method}] URL:[${req.url}]`);
  });
  next();
};