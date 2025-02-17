import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logging.error(`Error - METHOD:[${req.method}] URL:[${req.url}] IP:[${req.socket.remoteAddress}] PORT:[${req.socket.remotePort}]`);
  res.json({ status: 'error', message: err.message, path: req.path }).end();
  return
};