import { NextFunction, Response, Request, Router } from 'express';
import tasks from './tasks';
import tasksComment from './tasksComment';
import projects from './projects';

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
routes.use('/tasksComment', tasksComment);
routes.use('/projects', projects);

export default routes;
