import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Projects } from '../entity/Project';

class ProjectsController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // setting pager
    const limit = req.query.limit;
    const offset = req.query.offset;

    let query = `select * from projects`;

    //Get project from database
    const projectRepository = getRepository(Projects);
    try {
      const project = await projectRepository.query(query);
      //Send the project object
      res.send({ project: project });
      return;
    } catch (e) {
      res.status(404).send('project not found');
      return;
    }
  };
  static getOneById = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;
    console.log(id);

    //Get project from database
    const projectRepository = getRepository(Projects);
    try {
      const project = await projectRepository.findOneOrFail(id);
      res.send({ project: project });
    } catch (error) {
      res.status(404).send(`project ${id} not found because ${error}`);
      return;
    }
  };
  static newProjects = async (req: Request, res: Response): Promise<void> => {
    //Get parameters from the body
    const { userCompaniesId,
      name,
      startDate,
      endDate,
      status,
      color,
      overview,
      updatedAt } = req.body;

    const project = new Projects({
      userCompaniesId,
  name,
  startDate,
  endDate,
  status,
  color,
  overview,
  updatedAt
    });

    //Validate if the parameters are ok
    const errors = await validate(project);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save. If fails, the name is already in use
    const projectRepository = getRepository(Projects);
    try {
      await projectRepository.save(project);
    } catch (e) {
      res.status(409).send(`error:${e}`);
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ status: 'OK', project: project });
  };

  static editProjects = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;

    //Get values from the body
    const {userCompaniesId,
      name,
      startDate,
      endDate,
      status,
      color,
      overview,
      updatedAt} = req.body;

    //Try to find group on database
    const projectRepository = getRepository(Projects);
    let project;
    try {
      project = await projectRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('group to edit not found');
      return;
    }

    //Validate the new values on model
    project.update({userCompaniesId,
      name,
      startDate,
      endDate,
      status,
      color,
      overview,
      updatedAt});

    const errors = await validate(project);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means name already in use
    try {
      await projectRepository.save(project);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send({ status: 'OK', project: project });
  };

  static deleteProjects = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;
    
    const projectRepository = getRepository(Projects);
    let project!: Projects;
    try {
      project = await projectRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('project to delete not found');
      return;
    }
    await projectRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send({ status: 'OK', project: project });
  };
}

export default ProjectsController;
