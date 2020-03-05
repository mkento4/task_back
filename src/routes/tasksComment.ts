import { Router } from 'express';
import TaskCommentController from '../controllers/TaskCommentController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all tasks
router.get(
  '/all',
  // [checkJwt, checkRole(['ADMIN'])],
  TaskCommentController.listAll
);

// get details
router.get(
  '/',
  // [checkJwt, checkRole(['ADMIN'])],
  TaskCommentController.getOneById
);

//Create a new tasks
router.post(
  '/new',
  // [checkJwt, checkRole(['ADMIN'])],
  TaskCommentController.newTaskComments
);

//Edit one tasks
router.post(
  '/update',
  // [checkJwt, checkRole(['ADMIN'])],
  TaskCommentController.editTaskComments
);

//Delete one tasks
router.delete(
  '/',
  // [checkJwt, checkRole(['ADMIN'])],
  TaskCommentController.deleteTaskComments
);

export default router;
