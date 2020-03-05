import { Router } from 'express';
import ProjectsController from '../controllers/ProjectController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all tasks
router.get(
  '/all',
  // [checkJwt, checkRole(['ADMIN'])],
  ProjectsController.listAll
);

// get details
router.get(
  '/',
  // [checkJwt, checkRole(['ADMIN'])],
  ProjectsController.getOneById
);

//Create a new tasks
router.post(
  '/new',
  // [checkJwt, checkRole(['ADMIN'])],
  ProjectsController.newProjects
);

//Edit one tasks
router.post(
  '/update',
  // [checkJwt, checkRole(['ADMIN'])],
  ProjectsController.editProjects
);

//Delete one tasks
router.delete(
  '/',
  // [checkJwt, checkRole(['ADMIN'])],
  ProjectsController.deleteProjects
);

export default router;
