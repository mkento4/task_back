import { Router } from 'express';
import TasksController from '../controllers/TaskController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all tasks
router.get(
  '/all',
  // [checkJwt, checkRole(['ADMIN'])],
  TasksController.listAll
);

// get details
router.get(
  '/',
  // [checkJwt, checkRole(['ADMIN'])],
  TasksController.getOneById
);

//Create a new tasks
router.post(
  '/new',
  // [checkJwt, checkRole(['ADMIN'])],
  TasksController.newTasks
);

//Edit one tasks
router.post(
  '/update',
  // [checkJwt, checkRole(['ADMIN'])],
  TasksController.editTasks
);

//Delete one tasks
router.delete(
  '/',
  // [checkJwt, checkRole(['ADMIN'])],
  TasksController.deleteTasks
);

export default router;
