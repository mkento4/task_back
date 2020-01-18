import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Tasks } from '../entity/Tasks';

class TasksController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // setting pager
    const limit = req.query.limit;
    const offset = req.query.offset;

    let query = `select * from tasks`;

    //Get tasks from database
    const tasksRepository = getRepository(Tasks);
    try {
      const tasks = await tasksRepository.query(query);
      //Send the tasks object
      res.send({ tasks: tasks });
      return;
    } catch (e) {
      res.status(404).send('tasks not found');
      return;
    }
  };
  static getOneById = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;

    //Get tasks from database
    const tasksRepository = getRepository(Tasks);
    try {
      const tasks = await tasksRepository.findOneOrFail(id);
      res.send({ tasks: tasks });
    } catch (error) {
      res.status(404).send(`tasks ${id} not found because ${error}`);
      return;
    }
  };
  static newTasks = async (req: Request, res: Response): Promise<void> => {
    //Get parameters from the body
    const { users_id,
      contents_json,
        updatedAt } = req.body;

    const tasks = new Tasks({
      users_id,
  contents_json,
    updatedAt
    });

    //Validate if the parameters are ok
    const errors = await validate(tasks);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save. If fails, the name is already in use
    const tasksRepository = getRepository(Tasks);
    try {
      await tasksRepository.save(tasks);
    } catch (e) {
      res.status(409).send(`error:${e}`);
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ status: 'OK', tasks: tasks });
  };

  static editTasks = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;

    //Get values from the body
    const {users_id,
      contents_json,
        updatedAt } = req.body;

    //Try to find group on database
    const tasksRepository = getRepository(Tasks);
    let tasks;
    try {
      tasks = await tasksRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('group to edit not found');
      return;
    }

    //Validate the new values on model
    tasks.update({users_id,
      contents_json,
        updatedAt });

    const errors = await validate(tasks);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means name already in use
    try {
      await tasksRepository.save(tasks);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send({ status: 'OK', tasks: tasks });
  };

  static deleteTasks = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;
    
    const tasksRepository = getRepository(Tasks);
    let tasks!: Tasks;
    try {
      tasks = await tasksRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('tasks to delete not found');
      return;
    }
    await tasksRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send({ status: 'OK', tasks: tasks });
  };
}

export default TasksController;
