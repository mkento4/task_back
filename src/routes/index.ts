import { NextFunction, Response, Request, Router } from 'express';
import tasks from './tasks';

const routes = Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    data: {
      id: req.query.id,
      data: req.query.data,
    },
  });
  return next();
});

// all other routes
routes.use('/tasks', tasks);

export default routes;
