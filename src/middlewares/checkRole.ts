import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getRepository } from 'typeorm';

import { UsersCompanies } from '../entity/UsersCompanies';
import { Role } from '../entity/Role';

export const checkRole = (
  roles: Array<Role> | Array<string>
): RequestHandler => {
  // check Role | Array
  const roleTypes: Array<string> = [];
  roles.forEach((item: Role | string) => {
    if (typeof item === 'string') {
      roleTypes.push(item);
    } else {
      roleTypes.push(item.role);
    }
  });
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    //Get the user ID from previous middleware
    const id = res.locals.jwtPayload.id;

    //Get user role from the database
    const userRepository = getRepository(UsersCompanies);
    let user!: UsersCompanies;
    try {
      user = await userRepository.findOneOrFail(id);
      return next();
    } catch (id) {
      res.status(401).send('Not found login user id');
    }

    //Check if array of authorized roles includes the user's role
    const userRoles = await getRepository(Role).find({
      relations: ['users'],
    });
    if (userRoles === null || typeof userRoles === 'undefined') {
      return next();
    } else {
      let flag = false;
      userRoles.forEach((userRole: Role) => {
        if (roleTypes.includes(userRole.role)) {
          flag = true;
          console.log('user role accepted');
        }
      });
      if (flag) return next();
      else res.status(401).send(`Access not allowed with this role`);
      return next();
    }
  };
};
