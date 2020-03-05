import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { TaskComments } from '../entity/TaskComments';

class TaskCommentController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // setting pager
    const limit = req.query.limit;
    const offset = req.query.offset;

    let query = `select * from task_comments`;

    //Get taskComments from database
    const taskCommentsRepository = getRepository(TaskComments);
    try {
      const taskComments = await taskCommentsRepository.query(query);
      //Send the taskComments object
      res.send({ taskComments: taskComments });
      return;
    } catch (e) {
      res.status(404).send('taskComments not found');
      return;
    }
  };
  static getOneById = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;

    //Get taskComments from database
    const taskCommentsRepository = getRepository(TaskComments);
    try {
      const taskComments = await taskCommentsRepository.findOneOrFail(id);
      res.send({ taskComments: taskComments });
    } catch (error) {
      res.status(404).send(`taskComments ${id} not found because ${error}`);
      return;
    }
  };
  static newTaskComments = async (req: Request, res: Response): Promise<void> => {
    //Get parameters from the body
    const {replyId,
      usersId,
      niceCnt,
      taskId,
      comment,
      updatedAt} = req.body;

    const taskComments = new TaskComments({
      replyId,
      usersId,
      niceCnt,
      taskId,
      comment,
      updatedAt
    });

    //Validate if the parameters are ok
    const errors = await validate(taskComments);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save. If fails, the name is already in use
    const taskCommentsRepository = getRepository(TaskComments);
    try {
      await taskCommentsRepository.save(taskComments);
    } catch (e) {
      res.status(409).send(`error:${e}`);
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ status: 'OK', taskComments: taskComments });
  };

  static editTaskComments = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;


    //Get values from the body
    const {replyId,
      usersId,
      niceCnt,
      taskId,
      comment,
      updatedAt } = req.body;

    //Try to find group on database
    const taskCommentsRepository = getRepository(TaskComments);
    let taskComments;
    try {
      taskComments = await taskCommentsRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('group to edit not found');
      return;
    }

    //Validate the new values on model
    taskComments.update({replyId,
      usersId,
      niceCnt,
      taskId,
      comment,
      updatedAt});

    const errors = await validate(taskComments);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means name already in use
    try {
      await taskCommentsRepository.save(taskComments);
    } catch (e) {
      res.status(409).send('name already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send({ status: 'OK', taskComments: taskComments });
  };

  static deleteTaskComments = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.query.id;
    
    const taskCommentsRepository = getRepository(TaskComments);
    let taskComments!: TaskComments;
    try {
      taskComments = await taskCommentsRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('taskComments to delete not found');
      return;
    }
    await taskCommentsRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send({ status: 'OK', taskComments: taskComments });
  };
}

export default TaskCommentController;
